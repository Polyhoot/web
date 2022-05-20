import {
  Box, Button, FormField, Page, TextInput,
} from 'grommet'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createMedia, Media } from '../../domain/Question'
import getServerUrl from '../../utils/getServerUrl'

function ImportKahoot() {
  const [url, setUrl] = useState('')

  const startImport = async () => {
    const id = url.split('details/')[1]
    if (!id) { toast('Incorrect url') }
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    const result = (await fetch(`https://cors.eu.org/https://create.kahoot.it/rest/kahoots/${id}/card/?includeKahoot=true`, {
      headers,
    }).then((r) => r.json()).catch(() => toast('Error. Try again later.'))).kahoot
    const questions = result.questions.map((q: any) => {
      if (q.type === 'quiz') {
        let media: Media | null = null
        if (q.image) {
          media = createMedia({ url: q.image, type: 'picture' })
        }
        if (q.video.fullUrl) {
          media = createMedia({
            url: q.video.fullUrl,
            startTime: q.video.startTime,
            length: q.video.endTime - q.video.startTime,
            hideName: true,
            type: 'video',
          })
        }
        return {
          text: q.question.replace(/(<([^>]+)>)/ig, ''),
          type: 0,
          id: nanoid(6),
          time: q.time / 1000,
          answers: q.choices.map((c: { answer: string, correct: boolean }) => ({
            text: c.answer.replace(/(<([^>]+)>)/ig, ''),
            isCorrect: c.correct,
          })),
          media,
        }
      }
      return undefined
    }).filter((e: any) => e !== undefined)
    await fetch(`${getServerUrl}pack/autosave`, {
      method: 'POST',
      body: JSON.stringify({
        name: result.title,
        questions,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status !== 200) {
        toast.error('AutoSave error!')
      }
    })
  }

  return (
    <Page background={'light-2'} width={'100%'} height={'100%'}>
      <Box width={'400px'} height={'200px'} margin={'auto'}>
        <FormField label={'Kahoot url'} margin={'auto 0'}>
          <TextInput
            type={'url'}
            value={url}
            onInput={(e) => {
              const target = (e.target) as HTMLInputElement
              setUrl(target.value)
            }}
          />
        </FormField>
        <Box width={'100px'} margin={'auto'}>
          <Button label={'Import'} margin={'auto'} onClick={startImport} />
        </Box>
      </Box>
    </Page>
  )
}

export default ImportKahoot

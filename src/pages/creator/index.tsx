/* eslint-disable no-alert */
import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '@nanostores/react'
import {
  Box, Grid,
} from 'grommet'
import { useNavigate } from 'react-router-dom'
import { Id, toast } from 'react-toastify'
import {
  createQuestion, pack, questions, updatePackId,
} from '../../stores/pack'
import './creator.scss'
import CreatorHeader from './header'
import Sidebar from './sidebar'
import QuestionEditor from './question'
import getServerUrl from '../../utils/getServerUrl'
import { AutoSaveInitResponse } from '../../domain/AutoSave'

function CreatorPage() {
  const store = useStore(pack)
  const [questionId, setQuestionId] = useState(0)
  const [autoSave, setAutoSave] = useState(false)
  const [saving, setSaving] = useState(false)
  const toastId = useRef<Id | null>(null)
  const autosaveInterval = useRef<NodeJS.Timer | null>(null)

  const navigate = useNavigate()
  const savePack = async () => {
    if (!store.name) {
      toast('Set pack name to use autosave')
      return
    }
    await fetch(`${getServerUrl}pack/create`, {
      method: 'POST',
      body: JSON.stringify({
        name: store.name,
        questions: questions.get(),
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()).catch(() => toast('Error. Try again later'))
    pack.set({ name: '' })
    questions.set([createQuestion()])
    navigate('/')
  }

  const toggleAutosave = async () => {
    if (!store.name) {
      toast.error('Set pack name to use autosave')
      return
    }
    if (!store.id) {
      const response: AutoSaveInitResponse = await fetch(`${getServerUrl}pack/autosave`, {
        method: 'POST',
        body: JSON.stringify({
          name: store.name,
          questions: questions.get(),
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()).catch(() => toast.error('Error. Try again later'))
      if (response.packId) {
        updatePackId(response.packId)
      }
    }
    setAutoSave(!autoSave)
    if (!autoSave) {
      toast.info('Autosave enabled')
    } else {
      toast.info('Autosave disabled')
    }
  }

  const autoSavePack = async () => {
    if (!autoSave) return
    setSaving(true)
    await fetch(`${getServerUrl}pack/save`, {
      method: 'POST',
      body: JSON.stringify({
        name: store.name,
        questions: questions.get(),
        packId: store.id,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status !== 200) {
        toast.error('AutoSave error!')
      }
      setSaving(false)
    })
  }

  useEffect(() => () => {
    pack.set({ name: '' })
    questions.set([createQuestion()])
    if (autoSave) autoSavePack()
    // eslint-disable-next-line no-restricted-globals
    if (!autoSave) confirm('Are you sure, that you want to exit?')
  }, [])

  useEffect(() => {
    if (autoSave) {
      autosaveInterval.current = setInterval(autoSavePack, 20000)
    } else if (autosaveInterval.current) {
      clearInterval(autosaveInterval.current)
    }
    return () => {
      if (autosaveInterval.current) { clearInterval(autosaveInterval.current) }
    }
  }, [autoSave])

  useEffect(() => {
    if (saving) { toastId.current = toast.info('Saving...', { autoClose: false }) }
    if (!saving && toastId.current) toast.dismiss(toastId.current)
  }, [saving])
  return (
    <div className={'App'}>
      <div className={'creator'}>
        <Grid
          justify={'stretch'}
          fill
          rows={['60px', 'auto']}
          columns={['small', 'auto']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'slides', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea={'header'}
            background={'light-1'}
          >
            <CreatorHeader
              savePack={() => savePack()}
              toggleAutosave={() => toggleAutosave()}
              autoSave={autoSave}
            />
          </Box>
          <Box
            gridArea={'slides'}
            background={'light-2'}
            style={{
              boxShadow: 'rgb(0 0 0 / 15%) 0px 2px 4px 0px',
            }}
          >
            <Sidebar
              setQuestionId={(id) => setQuestionId(id)}
              active={questionId}
            />
          </Box>
          <Box gridArea={'main'}>
            <QuestionEditor id={questionId} />
          </Box>
        </Grid>
      </div>
    </div>
  )
}

export default CreatorPage

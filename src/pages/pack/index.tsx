import {
  Box, Button, Page, Spinner, Heading, Text, Avatar,
} from 'grommet'
import { UserFemale } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Pack } from '../../domain/Pack'
import getServerUrl from '../../utils/getServerUrl'
import QuestionList from './questionList'

interface PackComplete extends Pack {
  authorName: string,
}

function PackPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [pack, setPack] = useState<PackComplete>()

  const getPack = async () => {
    const response = await fetch(`${getServerUrl}pack/get/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const result = await response.json()
      setPack(result)
    }
  }

  useEffect(() => {
    getPack()
  }, [])

  if (pack) {
    return (
      <Page width={'100%'} height={'100%'} direction={'row'}>
        <Box width={'20%'} height={'100%'} style={{ minWidth: '300px' }}>
          <Box margin={'30px auto'}>
            <Heading level={2} margin={'10px'}>{pack.name}</Heading>
            <Text weight={'lighter'}>{`${pack.questions.length} questions`}</Text>
            <Box direction={'row'} gap={'small'} margin={'50px auto'}>
              <Avatar background={'accent-2'}>
                <UserFemale color={'accent-1'} />
              </Avatar>
              <Text alignSelf={'center'}>{pack.authorName}</Text>
            </Box>
            <Box width={'50%'} margin={'auto'}>
              <Button
                label={'Start'}
                onClick={() => {
                  navigate(`/game/play/${pack.id}`)
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box background={'light-5'} width={'80%'} height={'100%'}>
          <QuestionList questions={pack.questions} />
        </Box>
      </Page>
    )
  }
  return (
    <Box width={'100%'} height={'100%'}>
      <Spinner size={'large'} margin={'auto'} />
    </Box>
  )
}

export default PackPage

import { useStore } from '@nanostores/react'
import {
  Box, Button, Header, Heading, Page, Text,
} from 'grommet'
import React, { useEffect, useState } from 'react'
import { changeGameStatus, gameStore } from '../../stores/game'
import AnswersHolder from './answersHolder'
import QuestionMain from './questionMain'
import QuestionPreTimer from './questionPreTimer'

function QuestionPage(
  props: {
    socket: WebSocket,
  },
) {
  const { socket } = props

  const game = useStore(gameStore)
  const question = game.pack?.questions[game.question]
  const [isCountingDown, setCountingDown] = useState(true)
  const [timer, setTimer] = useState(0)

  const [questionTime, setQuestionTime] = useState(question?.time || 30)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1)
    }, 1000)
    if (timer > 4) {
      setCountingDown(false)
    }
    return () => clearInterval(interval)
  }, [timer])

  useEffect(() => {
    if (!isCountingDown) {
      const interval = setInterval(() => {
        setQuestionTime(questionTime - 1)
      }, 1000)
      if (questionTime === 0) {
        clearInterval(interval)
      }
      return () => clearInterval(interval)
    }
    return undefined
  }, [questionTime, isCountingDown])

  if (!question) {
    return null
  }
  if (isCountingDown) {
    return (
      <QuestionPreTimer text={question.text} time={timer} />
    )
  }
  return (
    <Page
      background={'light-2'}
      height={'100%'}
      style={{
        position: 'relative',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: '30px',
          right: '10px',
        }}
      >
        <Button label={'Skip'} size={'small'} onClick={() => changeGameStatus('SCOREBOARD')} />
      </Box>
      <Box
        width={'85%'}
        margin={'20px auto'}
        height={'fit-content'}
        background={'white'}
        style={{
          padding: '20px 40px',
          borderRadius: '4px',
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px 0px',
        }}
      >
        <Box
          margin={'auto'}
        >
          <Text weight={900} size={'36px'}>{question.text}</Text>
        </Box>
      </Box>
      <Box>
        {
          questionTime > 0
            ? (
              <QuestionMain
                media={question.media || {
                  url: 'https://assets-cdn.kahoot.it/builder/v2/assets/placeholder-cover-kahoot.dca23b0a.png',
                  hideName: null,
                  length: null,
                  startTime: null,
                  type: 'picture',
                }}
                time={questionTime}
                answersCounter={5}
              />
            )
            : (
              <Box height={'500px'}>
                {'time is up'}
              </Box>
            )
        }
        <Box>
          <AnswersHolder answers={question.answers} displayCorrect={questionTime < 1} />
        </Box>
      </Box>
    </Page>
  )
}

export default QuestionPage

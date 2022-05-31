import { useStore } from '@nanostores/react'
import {
  Box, Button, Page, Text,
} from 'grommet'
import React, { useEffect, useRef, useState } from 'react'
import {
  changeGameStatus, gameStore, playersStore, updatePlayerScore,
} from '../../../stores/game'
import AnswersHolder from '../answer/answersHolder'
import AnswerStats from '../answer/answerStats'
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

  const [answerStats, setAnswerStats] = useState([0, 0, 0, 0])
  const [peopleAnswered, setAnswered] = useState(0)
  const correctAnswers = useRef<number[]>([])

  const skipQuestion = () => {
    if (questionTime !== 0) {
      setQuestionTime(0)
    } else {
      changeGameStatus('SCOREBOARD')
    }
  }

  const addAnswer = (index: number) => {
    const data = [...answerStats]
    data[index] += 1
    setAnswerStats(data)
    setAnswered(peopleAnswered + 1)
    if (playersStore.get().length === peopleAnswered + 1) {
      skipQuestion()
    }
  }

  const socketListener = (ev: MessageEvent<any>) => {
    const data = JSON.parse(ev.data)
    if (data.action === 'answer') {
      addAnswer(data.answer)
    }
    if (data.action === 'scoreboard') {
      data.scoreboard.forEach(
        (player: { name: string, score: number }) => updatePlayerScore(player.name, player.score),
      )
    }
  }

  useEffect(() => {
    socket.addEventListener('message', socketListener)

    return () => socket.removeEventListener('message', socketListener)
  }, [peopleAnswered, answerStats])

  useEffect(() => {
    socket.send(JSON.stringify({
      action: 'get_ready',
    }))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1)
    }, 1000)
    if (timer > 4) {
      setCountingDown(false)
    }
    return () => clearInterval(interval)
  }, [timer, isCountingDown])

  useEffect(() => {
    if (!isCountingDown) {
      const answers: number[] = []
      question?.answers.forEach((ans, i) => {
        if (ans.isCorrect) { answers.push(i) }
      })
      correctAnswers.current = answers
      socket.send(JSON.stringify({
        action: 'send_question',
        duration: question?.time,
        answers,
        text: `${game.question + 1}/${game.pack?.questions.length}`,
      }))
    }
  }, [isCountingDown])

  useEffect(() => {
    if (!isCountingDown) {
      const interval = setInterval(() => {
        setQuestionTime(questionTime - 1)
      }, 1000)
      if (questionTime === 0) {
        clearInterval(interval)
        socket.send(JSON.stringify({
          action: 'time_up',
        }))
        socket.send(JSON.stringify({
          action: 'scoreboard',
        }))
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
        <Button label={'Skip'} size={'small'} onClick={() => skipQuestion()} />
      </Box>
      <Box
        style={{
          position: 'absolute',
          top: '50px',
          left: '10px',
        }}
      >
        <Text weight={900}>
          {game.question + 1}
          {'/'}
          {game.pack?.questions.length}
        </Text>
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
                answersCounter={peopleAnswered}
              />
            )
            : (
              <Box height={'500px'}>
                <AnswerStats stats={answerStats} correct={correctAnswers.current} />
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

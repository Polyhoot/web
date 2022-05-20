import {
  Box, Stack, Text, Image,
} from 'grommet'
import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { Question } from '../../domain/Question'

function QuestionComponent(props: {
  question: Question,
  showAnswer: boolean,
  index: number
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { question, showAnswer, index } = props

  return (
    <Box
      background={'white'}
      height={'500px'}
      direction={'row'}
      width={'90%'}
      margin={'0 auto 10px auto'}
      style={{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        borderRadius: '5px',
        minHeight: '150px',
      }}
    >
      <Box
        width={'80%'}
        style={{
          position: 'relative',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
          }}
        >
          <Text>{`${index + 1} - Quiz`}</Text>
        </Box>
        <Box
          margin={'auto'}
        >
          <Text size={'large'} truncate weight={'bolder'}>{question.text}</Text>
        </Box>
      </Box>
      <Box
        height={'auto'}
        width={'20%'}
        style={{
          minWidth: '200px',
        }}
        margin={'auto 20px auto auto'}
      >
        <Stack anchor={'bottom-right'}>
          {
            question.media?.type === 'video'
              ? <ReactPlayer light url={question.media.url} width={'210px'} height={'110px'} />
              : (
                <Image
                  width={'210px'}
                  height={'110px'}
                  fit={'cover'}
                  src={!question.media?.url ? 'https://assets-cdn.kahoot.it/builder/v2/assets/placeholder-cover-kahoot.dca23b0a.png' : question.media?.url}
                />
              )
          }

          <Box
            background={'brand'}
            pad={{ horizontal: 'xsmall' }}
            round
          >
            <Text>
              {question.time}
              {'sec.'}
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

function QuestionList(props: { questions: Question[] }) {
  const { questions } = props

  return (
    <Box
      width={'100%'}
      style={{
        padding: '10px',
        overflowY: 'auto',
      }}
    >
      {questions.map((q, i) => <QuestionComponent question={q} showAnswer key={q.id} index={i} />)}
    </Box>
  )
}

export default QuestionList

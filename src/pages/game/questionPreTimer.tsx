import { Page, Box, Text } from 'grommet'
import React from 'react'

function QuestionPreTimer(props: { time: number, text: string }) {
  const { time, text } = props
  return (
    <Page background={'neutral-2'} height={'100%'} style={{ position: 'relative' }}>
      <Box
        style={{
          width: '100%',
          background: 'white',
          margin: 'auto',
          height: 'max-content',
          padding: '50px 0',
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px 0px',
        }}
      >
        <Text
          style={{
            color: 'black',
            fontSize: '48px',
          }}
          weight={'bold'}
        >
          {text}
        </Text>
      </Box>
      <Box
        style={{
          borderRadius: '5px',
          background: 'white',
          width: `${time * 25}%`,
          height: '30px',
          top: '80%',
          left: '0',
          position: 'absolute',
          transition: '1s linear all',
        }}
      />
    </Page>
  )
}

export default QuestionPreTimer

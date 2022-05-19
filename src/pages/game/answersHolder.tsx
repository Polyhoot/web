/* eslint-disable react/no-array-index-key */
import { Box } from 'grommet'
import React from 'react'
import { Answer } from '../../domain/Question'
import GameAnswer from './answer'

function AnswersHolder(props: {
  answers: Answer[],
  displayCorrect: boolean,
}) {
  const { answers, displayCorrect } = props

  return (
    <Box
      direction={'row'}
      wrap
      style={{
        width: '100%',
      }}
    >
      {answers.map((a, i) => (
        <GameAnswer answer={a} index={i} displayCorrect={displayCorrect} key={`${a.text}_${i}`} />
      ))}
    </Box>
  )
}

export default AnswersHolder

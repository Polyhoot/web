import { useStore } from '@nanostores/react'
import { Box, Button, Page } from 'grommet'
import React from 'react'
import { changeGameStatus, gameStore, nextQuestion } from '../../stores/game'

function Scoreboard() {
  const game = useStore(gameStore)
  const question = game.pack?.questions[game.question]
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
        <Button label={'Skip'} size={'small'} onClick={() => nextQuestion()} />
      </Box>
    </Page>
  )
}

export default Scoreboard

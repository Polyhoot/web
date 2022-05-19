import { useStore } from '@nanostores/react'
import {
  Box, Button, Heading, Page, Text,
} from 'grommet'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { nextQuestion, playersStore } from '../../stores/game'

function Scoreboard(
  props: {
    finished: boolean,
    end: () => void,
  },
) {
  const { finished, end } = props
  const players = useStore(playersStore)
  return (
    <Page
      background={'brand'}
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
        {
          finished
            ? <Button label={'Exit'} size={'large'} onClick={() => end()} />
            : <Button label={'Skip'} size={'large'} onClick={() => nextQuestion()} />
        }

      </Box>
      <Box
        margin={'10px auto'}
        pad={'20px 40px'}
        background={'light-2'}
        elevation={'medium'}
      >
        <Text margin={'auto'} size={'42px'} weight={'bold'}>{finished ? 'Results' : 'Scoreboard'}</Text>
      </Box>
      <Box
        margin={'auto'}
        width={'70%'}
      >
        {
          players.sort((a, b) => b.score - a.score).map((p, i) => {
            if (i < 5) {
              return (
                <Box
                  key={p.name}
                  width={'100%'}
                  margin={'10px auto'}
                  elevation={'small'}
                  direction={'row'}
                  background={'light-1'}
                  pad={'10px'}
                >
                  <Text margin={'auto auto auto 10px'} weight={900} size={'24px'}>{p.name}</Text>
                  <Text margin={'auto 10px auto auto'} weight={900} size={'24px'}>{p.score}</Text>
                </Box>
              )
            }
            return undefined
          })
        }
      </Box>
    </Page>
  )
}

export default Scoreboard

import {
  Box, Text,
} from 'grommet'
import {
  Radial, Square, Trigger, Sun,
} from 'grommet-icons'
import React from 'react'
import { Answer } from '../../domain/Question'

export const styles = [
  {
    icon: <Radial color={'white'} fill={'white'} style={{ margin: 'auto' }} />,
    color: '#3D138D',
  },
  {
    icon: <Square color={'white'} fill={'white'} style={{ margin: 'auto' }} />,
    color: '#FFCA58',
  },
  {
    icon: <Trigger color={'white'} fill={'white'} style={{ margin: 'auto' }} />,
    color: '#00739D',
  },
  {
    icon: <Sun color={'white'} fill={'white'} style={{ margin: 'auto' }} />,
    color: '#00C781',
  },
]

function GameAnswer(
  props: {
    answer: Answer,
    displayCorrect: boolean,
    index: number,
  },
) {
  const { answer, displayCorrect, index } = props
  return (
    <Box
      background={styles[index].color}
      direction={'row'}
      width={'calc(50% - 20px)'}
      height={'100px'}
      margin={'20px auto'}
      elevation={'small'}
      style={{
        opacity: `${displayCorrect && !answer.isCorrect ? '0.3' : '1'}`,
      }}
    >
      <Box width={'10%'} height={'100%'} background={styles[index].color}>
        {styles[index].icon}
      </Box>
      <Box margin={'auto'} width={'88%'} direction={'row'}>
        <Text size={'24px'} weight={'bold'}>
          {answer.text}
        </Text>
      </Box>
    </Box>
  )
}

export default GameAnswer

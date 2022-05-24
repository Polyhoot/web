import { Box, Text } from 'grommet'
import React from 'react'
import { styles } from './answer'

function AnswerStats(
  props: {
    stats: number[],
    correct: number[],
  },
) {
  const { stats, correct } = props
  const total = stats.reduce((prev, curr) => prev + curr, 0)

  return (
    <Box
      width={'50%'}
      margin={'auto'}
      direction={'row'}
      height={'500px'}
    >
      {stats.map((v, i) => (
        <Box width={'100px'} margin={'auto'} height={'100%'}>
          <Box height={'90%'} width={'100%'}>
            <Box background={styles[i].color} height={`${(v * 100) / total}%`} alignSelf={'end'} margin={'auto 0 0 0'} width={'100%'} />
          </Box>
          <Box background={styles[i].color} height={'10%'}>
            <Text margin={'auto'} size={'24px'} weight={'bold'}>
              {`${v}`}
              {correct.includes(i) ? '✓' : ''}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default AnswerStats

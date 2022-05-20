import { Box, Text } from 'grommet'
import React from 'react'
import { Media } from '../../domain/Question'
import MediaHolder from './mediaHolder'

function QuestionMain(props: {
  media: Media,
  time: number,
  answersCounter: number
}) {
  const { media, time, answersCounter } = props
  return (
    <Box
      height={'500px'}
      direction={'row'}
    >
      <Box
        background={'light-2'}
        margin={'auto 0 auto 0'}
        style={{
          zIndex: '1000',
        }}
        width={'10%'}
        height={'100%'}
      >
        <Box
          background={'brand'}
          style={{
            margin: 'auto auto auto 30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            zIndex: '1000',
          }}
          elevation={'small'}
        >
          <Text color={'light-1'} weight={'bolder'} margin={'auto'}>
            {time}
          </Text>
        </Box>
      </Box>
      <Box
        justify={'center'}
        alignSelf={'center'}
        margin={'auto auto'}
        style={{
          justifySelf: 'center',
        }}
      >
        <MediaHolder media={media} />
      </Box>
      <Box
        background={'light-2'}
        margin={'auto 0 auto auto'}
        style={{
          zIndex: '1000',
        }}
        width={'10%'}
        height={'100%'}
      >
        <Box
          justify={'center'}
          alignSelf={'center'}
          margin={'auto'}
          style={{
            justifySelf: 'center',
            zIndex: '1001',
          }}
        >
          <Text weight={'bold'} size={'48px'}>{answersCounter}</Text>
          <Text weight={'bold'} size={'18px'}>{'Answers'}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default QuestionMain

import { Box, Button, Text } from 'grommet'
import { AddCircle } from 'grommet-icons'
import React from 'react'
import { Question } from '../../domain/Question'

function MediaHolder(props: { question: Question }) {
  const { question } = props
  if (!question.media) {
    return (
      <div className={'creator-question--media'} style={{ background: '#999999' }}>
        <Box margin={'auto'}>
          <Button icon={<AddCircle size={'large'} />} />
          <Text>{'Find and insert media'}</Text>
        </Box>
      </div>
    )
  }
  return (
    <div className={'creator-question--media'}>
      <Box>
        <AddCircle />
        <Text>{'Find and insert media'}</Text>
      </Box>
    </div>
  )
}

export default MediaHolder

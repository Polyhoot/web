import {
  Box, Button, Image, Text,
} from 'grommet'
import { AddCircle } from 'grommet-icons'
import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { Question, Video } from '../../../domain/Question'

function MediaHolder(props: { question: Question; showPicker: () => void }) {
  const { question, showPicker } = props
  if (!question.media) {
    return (
      <div
        className={'creator-question--media'}
        style={{ background: '#DADADA' }}
        role={'banner'}
      >
        <Box margin={'auto'} onClick={() => showPicker()}>
          <Button icon={<AddCircle size={'large'} />} />
          <Text>{'Find and insert media'}</Text>
        </Box>
      </div>
    )
  }
  if ((question.media as Video).length) {
    const video = question.media as Video
    return (
      <div className={'creator-question--media'}>
        <Box width={'100%'} height={'100%'}>
          <ReactPlayer
            url={question.media.url}
            controls={false}
            config={{
              playerVars: {
                autoplay: 0,
                controls: 1,
                start: video.startTime,
                end: video.length + video.startTime,
              },
            }}
            width={'100%'}
            height={'100%'}
          />
        </Box>
      </div>
    )
  }
  return (
    <div className={'creator-question--media'}>
      <Box width={'100%'} height={'100%'}>
        <Image src={question.media.url} fit={'contain'} />
      </Box>
    </div>
  )
}

export default MediaHolder

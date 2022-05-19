/* eslint-disable react/require-default-props */
import {
  Box, Button, Image, Text,
} from 'grommet'
import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { Media, Question, Video } from '../../domain/Question'

function MediaHolder(props: {
  media: Media,
}) {
  const { media } = props
  if ((media as Video).length) {
    const video = (media as Video)
    return (
      <div className={'creator-question--media'}>
        <Box width={'100%'} height={'100%'}>
          <ReactPlayer
            url={media?.url}
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
        <Image
          fit={'contain'}
          src={media.url}
        />
      </Box>
    </div>
  )
}
export default MediaHolder

/* eslint-disable react/require-default-props */
import {
  Box, Image,
} from 'grommet'
import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import { addAbortSignal } from 'stream'
import { Media, Video } from '../../domain/Question'
import './media.scss'

function propsAreEqual(prev: {
  media: Media,
}, next: {
  media: Media,
}) {
  return prev.media.url === next.media.url
}

function MediaHolder(props: {
  media: Media,
}) {
  const { media } = props
  const player = useRef<ReactPlayer | null>(null)
  console.log(media)
  if ((media as Video).length) {
    const video = (media as Video)
    return (
      <div className={'creator-question--media'}>
        <Box width={'100%'} height={'100%'}>
          <div className={'frame-container'}>
            <ReactPlayer
              key={media.url}
              url={media?.url}
              controls={false}
              config={{
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  showinfo: 0,
                  playsinline: 0,
                  iv_load_policy: 3,
                  fs: 1,
                  widgetid: 1,
                  modestbranding: 1,
                  start: video.startTime,
                  end: video.length + video.startTime,
                  origin: 'https://play.kahoot.it/',
                },
                embedOptions: {
                  origin: 'https://play.kahoot.it/',
                },
              }}
              width={'100%'}
              height={'100%'}
              ref={player}
            />
          </div>
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
export default React.memo(MediaHolder, propsAreEqual)

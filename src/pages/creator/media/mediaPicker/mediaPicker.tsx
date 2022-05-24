import { Box } from 'grommet'
import React, { useState } from 'react'
import { Video } from '../../../../domain/Question'
import { updateMedia } from '../../../../stores/pack'
import MediaPickerInput from './mediaPickerInput'
import VideoPicker from './videoPicker'

function MediaPicker(props: { id: number; close: () => void }) {
  const { id, close } = props
  const [video, setVideo] = useState<Video>()

  if (video) {
    return (
      <Box margin={'auto'} width={'500px'}>
        <VideoPicker
          video={video}
          changeTime={(start, end) => {
            setVideo({
              url: video.url,
              startTime: start,
              length: end - start,
              hideName: true,
              type: 'video',
            })
          }}
          save={() => {
            updateMedia(id, video)
            close()
          }}
        />
      </Box>
    )
  }
  return (
    <MediaPickerInput
      setVideo={(url) => {
        setVideo({
          url,
          startTime: 0,
          length: 20,
          hideName: true,
          type: 'video',
        })
      }}
      setPicture={(url) => {
        updateMedia(id, { url, type: 'picture' })
        close()
      }}
    />
  )
}

export default MediaPicker

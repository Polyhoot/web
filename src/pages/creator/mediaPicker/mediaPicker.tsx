import {
  Box, FormField, TextInput, Button, Text,
} from 'grommet'
import React, { useState } from 'react'
import { Picture, Video } from '../../../domain/Question'
import { updateMedia } from '../../../stores/pack'
import MediaPickerInput from './mediaPickerInput'
import VideoPicker from './videoPicker'

function MediaPicker(
  props: {
    id: number,
    close: () => void
  },
) {
  const { id, close } = props
  const [video, setVideo] = useState<Video>()
  const [picture, setPicture] = useState<Picture>()
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
        })
      }}
      setPicture={(url) => {
        updateMedia(id, { url })
        close()
      }}
    />
  )
}

export default MediaPicker
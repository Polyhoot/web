import {
  FormField, TextInput, Box, Button, Text,
} from 'grommet'
import React, { useState } from 'react'

function MediaPickerInput(
  props: {
    setVideo: (url: string) => void,
    setPicture: (url: string) => void
  },
) {
  const { setVideo, setPicture } = props
  const [videoUrl, setVideoUrl] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  return (
    <>
      <FormField
        label={'Paste URL to Youtube video'}
        width={'80%'}
        margin={'20px auto'}
      >
        <TextInput
          placeholder={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
          plain
          focusIndicator={false}
          type={'url'}
          value={videoUrl}
          textAlign={'center'}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </FormField>
      <Box width={'150px'} margin={'0 40px 10px auto'}>
        <Button
          secondary
          label={'Add video'}
          onClick={(e) => {
            setVideo(videoUrl)
          }}
        />
      </Box>
      <Text>
        {'Or'}
      </Text>
      <FormField
        label={'Paste URL to a picture'}
        width={'80%'}
        margin={'20px auto'}
      >
        <TextInput
          placeholder={'Picture URL'}
          plain
          focusIndicator={false}
          type={'url'}
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
          textAlign={'center'}
        />
      </FormField>
      <Box width={'150px'} margin={'0 40px 10px auto'}>
        <Button
          secondary
          label={'Add picture'}
          onClick={(e) => {
            setPicture(pictureUrl)
          }}
        />
      </Box>
    </>
  )
}

export default MediaPickerInput

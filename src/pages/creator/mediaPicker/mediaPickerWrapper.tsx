import {
  Box, Anchor,
} from 'grommet'
import { Close } from 'grommet-icons'
import React from 'react'
import MediaPicker from './mediaPicker'

function MediaPickerWrapper(
  props: {
    close: () => void,
    id: number,
  },
) {
  const { close, id } = props
  return (
    <Box className={'media-picker'}>
      <Box
        className={'media-picker--inner'}
        width={'700px'}
        height={'500px'}
        background={'light-2'}
        margin={'auto'}
        style={{
          zIndex: 1000,
        }}
      >
        <Anchor icon={<Close />} className={'media-picker--inner_close'} onClick={() => close()} />
        <MediaPicker id={id} close={close} />
      </Box>
    </Box>
  )
}

export default MediaPickerWrapper

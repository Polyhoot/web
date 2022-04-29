import {
  Anchor,
  Box, Button, MaskedInput, Text,
} from 'grommet'
import React, { useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { Video } from '../../../domain/Question'
import getVideoId from '../../../utils/getVideoId'

function VideoPicker(
  props: {
    video: Video,
    changeTime: (start: number, end: number) => void,
    save: () => void,
  },
) {
  const { video, changeTime, save } = props

  const videoId = getVideoId(video.url)

  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)

  const stringToSeconds = (str: string): number => {
    if (/^(([0]?[0-5][0-9]|[0-9]):([0-5][0-9]))$/.test(str)) {
      const splitted = str.split(':')
      return parseInt(splitted[0], 10) * 60 + parseInt(splitted[1], 10)
    }
    return 0
  }
  if (videoId !== false) {
    return (
      <Box direction={'column'}>
        <Box margin={'auto'} width={'600px'} height={'300px'}>
          <ReactPlayer
            url={video.url}
            controls={false}
            config={{
              playerVars: {
                autoplay: 1,
                controls: 1,
                start: video.startTime,
                end: video.length + video.startTime,
              },
            }}
            width={'100%'}
            height={'100%'}
          />
        </Box>
        <Box direction={'row'} margin={'10px 0'}>
          <Box width={'120px'}>
            <Text size={'small'} margin={'auto auto 5px 2px'}>{'Start Time'}</Text>
            <Box direction={'row'}>
              <MaskedInput
                textAlign={'center'}
                mask={[
                  {
                    length: 2,
                    regexp: /^[0-5][0-9]$|^[0-9]$/,
                    placeholder: 'mm',
                  },
                  { fixed: ':' },
                  {
                    length: 2,
                    regexp: /^[0-5][0-9]$|^[0-9]$/,
                    placeholder: 'ss',
                  },
                ]}
                onChange={(event) => {
                  setStartTime(stringToSeconds(event.target.value))
                }}
              />
              <Anchor
                label={'Set'}
                size={'small'}
                margin={'auto 10px'}
                onClick={(e) => {
                  changeTime(startTime, endTime)
                }}
              />
            </Box>
          </Box>
          <Box width={'120px'} margin={'0 0 0 auto'}>
            <Text size={'small'} margin={'auto auto 5px 2px'}>{'Start Time'}</Text>
            <Box direction={'row'}>
              <MaskedInput
                textAlign={'center'}
                mask={[
                  {
                    length: 2,
                    regexp: /^[0-5][0-9]$|^[0-9]$/,
                    placeholder: 'mm',
                  },
                  { fixed: ':' },
                  {
                    length: 2,
                    regexp: /^[0-5][0-9]$|^[0-9]$/,
                    placeholder: 'ss',
                  },
                ]}
                onChange={(event) => {
                  setEndTime(stringToSeconds(event.target.value))
                }}
              />
              <Anchor
                label={'Set'}
                size={'small'}
                margin={'auto 10px'}
                onClick={(e) => {
                  changeTime(startTime, endTime)
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Button label={'Add video'} onClick={(e) => save()} />
        </Box>
      </Box>
    )
  }
  return (
    <>
    </>
  )
}

export default VideoPicker

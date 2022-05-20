import {
  Box, Anchor, Text, Card,
} from 'grommet'
import React, { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pack } from '../../../domain/Pack'

function PackComponent(
  props: {
    pack: Pack,
  },
) {
  const { pack } = props
  const navigate = useNavigate()
  return (
    <Card
      width={'90%'}
      height={'100px'}
      direction={'row-responsive'}
      key={pack.id}
      onClick={(e: MouseEvent) => {
        e.stopPropagation()
        navigate(`/pack/${pack.id}`)
      }}
      style={{
        cursor: 'pointer',
        border: '1px solid grey',
        margin: '10px auto',
        minHeight: '100px',
      }}
    >
      <Box
        height={'100%'}
        width={'100px'}
        style={{
          borderRight: '1px solid grey',
        }}
      >
        <Text margin={'auto'} size={'small'}>
          {pack.questions.length}
          {' questions'}
        </Text>
      </Box>
      <Box
        direction={'column'}
        margin={'auto'}
        style={{
          position: 'relative',
        }}
        height={'100%'}
        width={'80%'}
      >
        <Box direction={'column'} margin={'auto'}>
          <Box>
            <Text truncate={'tip'}>{pack.name}</Text>
          </Box>
          <Box direction={'row'} margin={'auto'}>
            <Text>
              {'Author: '}
              <Anchor label={pack.authorName} />
            </Text>
          </Box>
        </Box>
        <Box style={{
          position: 'absolute',
          margin: 'auto 10px 5px auto',
          bottom: '0',
          right: '10px',
        }}
        >
          <Anchor
            label={'Edit pack'}
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/creator/${pack.id}`)
            }}
          />
        </Box>
      </Box>
    </Card>
  )
}

function MyPacks(
  props: {
    packs: Pack[]
  },
) {
  const { packs } = props
  if (packs.length === 0) {
    return (
      <Text>
        {'Nothing here yet!'}
      </Text>
    )
  }
  return (
    <Box overflow={'auto'} height={'100%'}>
      {packs.map((pack) => (
        <PackComponent pack={pack} key={pack.id} />
      ))}
    </Box>
  )
}

export default MyPacks

import React from 'react'
import {
  Anchor, Box, Grid, Text,
} from 'grommet'
import { useStore } from '@nanostores/react'
import { useNavigate } from 'react-router-dom'
import { profile } from '../../stores/profile'
import './home.scss'

function Home() {
  const user = useStore(profile)
  const navigate = useNavigate()
  return (
    <div className={'Home'}>
      <Grid
        rows={['100%']}
        className={'Home-grid'}
        margin={'auto'}
        height={'100%'}
        fill
        columns={['small', 'medium', 'xsmall']}
        gap={'small'}
        areas={[
          { name: 'sidebar', start: [0, 0], end: [1, 0] },
          { name: 'main', start: [1, 0], end: [2, 0] },
          { name: 'sidebar-left', start: [2, 0], end: [3, 0] },
        ]}
      >
        <Box gridArea={'sidebar'} background={'brand'} />
        <Box gridArea={'main'} background={'light-5'} />
        <Box gridArea={'sidebar-left'} background={'light-2'}>
          <Anchor label={'Create'} onClick={() => navigate('/creator')} />
        </Box>
      </Grid>
    </div>
  )
}

export default Home

import { Box, Grid, Page } from 'grommet'
import React from 'react'
import './creator.scss'
import CreatorHeader from './header'

function CreatorPage() {
  return (
    <div className={'App'}>
      <div className={'creator'}>
        <Grid
          justify={'stretch'}
          fill
          rows={['60px', 'auto']}
          columns={['small', 'auto', '20%']}
          areas={[
            { name: 'header', start: [0, 0], end: [2, 0] },
            { name: 'slides', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
            { name: 'settings', start: [2, 1], end: [2, 1] },
          ]}
        >
          <Box
            gridArea={'header'}
            background={'light-1'}
          >
            <CreatorHeader />
          </Box>
          <Box gridArea={'slides'} background={'light-2'} border={'between'} />
          <Box gridArea={'main'} background={'light-2'} />
          <Box gridArea={'settings'} background={'light-3'} />
        </Grid>
      </div>
    </div>
  )
}

export default CreatorPage

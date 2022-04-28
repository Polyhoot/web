import React, { useState } from 'react'
import { useStore } from '@nanostores/react'
import {
  Box, Grid,
} from 'grommet'
import { pack, questions } from '../../stores/pack'
import './creator.scss'
import CreatorHeader from './header'
import Sidebar from './sidebar'
import QuestionEditor from './question'

function CreatorPage() {
  const store = useStore(pack)
  const [questionId, setQuestionId] = useState(0)
  return (
    <div className={'App'}>
      <div className={'creator'}>
        <Grid
          justify={'stretch'}
          fill
          rows={['60px', 'auto']}
          columns={['small', 'auto', '15%']}
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
          <Box gridArea={'slides'} background={'light-2'}>
            <Sidebar setQuestionId={(id) => setQuestionId(id)} />
          </Box>
          <Box gridArea={'main'}>
            <QuestionEditor id={questionId} />
          </Box>
          <Box gridArea={'settings'} background={'light-3'} />
        </Grid>
      </div>
    </div>
  )
}

export default CreatorPage

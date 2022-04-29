import React, { useState } from 'react'
import { useStore } from '@nanostores/react'
import {
  Box, Grid,
} from 'grommet'
import { pack, questions, updateQuestionTime } from '../../stores/pack'
import './creator.scss'
import CreatorHeader from './header'
import Sidebar from './sidebar'
import QuestionEditor from './question'
import LeftSidebar from './left-sidebar'

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
          columns={['small', 'auto']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'slides', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea={'header'}
            background={'light-1'}
          >
            <CreatorHeader />
          </Box>
          <Box
            gridArea={'slides'}
            background={'light-2'}
            style={{
              boxShadow: 'rgb(0 0 0 / 15%) 0px 2px 4px 0px',
            }}
          >
            <Sidebar setQuestionId={(id) => setQuestionId(id)} active={questionId} />
          </Box>
          <Box gridArea={'main'}>
            <QuestionEditor id={questionId} />
          </Box>
        </Grid>
      </div>
    </div>
  )
}

export default CreatorPage

import { useStore } from '@nanostores/react'
import { Box, Grid, TextInput } from 'grommet'
import React, { useState } from 'react'
import {
  questions, updateAnswerStatus, updateAnswerText, updateQuestionTime, updateTitle,
} from '../../stores/pack'
import CreatorAnswer from './answer'
import LeftSidebar from './left-sidebar'
import MediaHolder from './mediaHolder'
import MediaPickerWrapper from './mediaPicker/mediaPickerWrapper'

function QuestionEditor(props: {
  id: number
}) {
  const { id } = props
  const store = useStore(questions)
  const current = store[id]
  const [showPicker, setShowPicker] = useState(false)
  console.log(current)
  return (
    <Grid
      justify={'stretch'}
      fill
      rows={['auto']}
      columns={['auto', '15%']}
      areas={[
        { name: 'main', start: [0, 0], end: [1, 0] },
        { name: 'settings', start: [1, 0], end: [2, 0] },
      ]}
    >
      <Box gridArea={'main'}>
        <div className={'creator-question'}>
          <TextInput
            placeholder={'Enter your question...'}
            style={{
              boxShadow: 'rgb(0 0 0 / 15%) 0px -4px 0px 0px inset',
              border: '2px solid rgb(0 0 0 / 5%)',
            }}
            value={current.text}
            onChange={(e) => updateTitle(id, e.target.value)}
            width={'700px'}
            textAlign={'center'}
            size={'large'}
            plain
            focusIndicator={false}
          />
          <MediaHolder question={current} showPicker={() => setShowPicker(true)} />
          <div className={'creator-question--answers'}>
            {current.answers.map((ans, index) => (
              <CreatorAnswer
                updateAnswerText={(text) => updateAnswerText(id, text, index)}
                updateAnswerStatus={(status) => updateAnswerStatus(id, index, status)}
                index={index}
                isCorrect={ans.isCorrect}
            // eslint-disable-next-line react/no-array-index-key
                key={`${id}_answer#${index}`}
                defaultText={ans.text}
              />
            ))}
          </div>
        </div>
      </Box>
      <Box
        gridArea={'settings'}
        background={'light-3'}
        style={{
          boxShadow: 'rgb(0 0 0 / 15%) -2px 0px 4px 0px',
        }}
      >
        <LeftSidebar
          updateQuestionTime={(time) => updateQuestionTime(id, time)}
          time={current.time}
        />
      </Box>
      {
            showPicker
              ? <MediaPickerWrapper close={() => setShowPicker(false)} id={id} />
              : null
          }
    </Grid>
  )
}

export default QuestionEditor

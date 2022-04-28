import { useStore } from '@nanostores/react'
import { Box, TextInput } from 'grommet'
import { CircleAlert } from 'grommet-icons'
import { nanoid } from 'nanoid'
import React, { useCallback, useEffect, useState } from 'react'
import {
  editQuestion, questions, updateAnswerText, updateTitle,
} from '../../stores/pack'
import CreatorAnswer from './answer'
import MediaHolder from './mediaHolder'

function QuestionEditor(props: {
  id: number
}) {
  const { id } = props
  const store = useStore(questions)
  const current = store[id]
  return (
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
      <MediaHolder question={current} />
      <div className={'creator-question--answers'}>
        {current.answers.map((ans, index) => (
          <CreatorAnswer
            updateAnswerText={(text) => updateAnswerText(id, text, index)}
            index={index}
            isCorrect={ans.isCorrect}
            // eslint-disable-next-line react/no-array-index-key
            key={`${id}_answer#${index}`}
            defaultText={ans.text}
          />
        ))}
      </div>
    </div>
  )
}

export default QuestionEditor

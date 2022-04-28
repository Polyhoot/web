import { useStore } from '@nanostores/react'
import { Box, Text, TextInput } from 'grommet'
import { AddCircle } from 'grommet-icons'
import React, { useEffect } from 'react'
import { Question } from '../../domain/Question'
import { addQuestion, editQuestion, questions } from '../../stores/pack'
import MediaHolder from './mediaHolder'

function QuestionEditor(props: {
  id: number
}) {
  const { id } = props
  const store = useStore(questions)
  useEffect(() => {
    if (store.length - 1 < id) {
      addQuestion({
        text: '',
        time: 20,
        type: 0,
      })
    }
  }, [])
  const question = store[id] || {
    text: '',
    time: 20,
    type: 0,
  }

  const updateQuestionInStore = () => {
    editQuestion(id, question)
  }
  return (
    <div className={'creator-question'}>
      <TextInput
        placeholder={'Enter your question...'}
        className={'header-input'}
        onChange={(e) => {
          question.text = e.target.value
          updateQuestionInStore()
        }}
        width={'700px'}
      />
      <MediaHolder question={question} />
    </div>
  )
}

export default QuestionEditor

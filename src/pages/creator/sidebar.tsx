import { useStore } from '@nanostores/react'
import {
  Button, Card, CardBody, CardHeader,
} from 'grommet'
import React from 'react'
import { Question } from '../../domain/Question'
import { addQuestion, questions } from '../../stores/pack'

function Sidebar(
  props: {
    setQuestionId: (id: number) => void,
  },
) {
  const store = useStore(questions)
  const { setQuestionId } = props
  return (
    <div className={'creator-sidebar'}>
      {store.map((q, index) => (
        <Card key={q.id} onClick={() => setQuestionId(index)} margin={'10px auto'} width={'90%'}>
          <CardHeader pad={'small'}>{q.text}</CardHeader>
          <CardBody pad={'medium'}>
            <div className={'creator-sidebar--card_answers'}>
              {q.answers.map((answer, aI) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`${q.id}_answer${aI}`} className={`creator-sidebar--card_answers__item ${answer.isCorrect ? 'correct' : null}`}>
                  <span>{answer.text}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}
      <Button
        label={'Add question'}
        onClick={() => {
          addQuestion()
          setQuestionId(store.length)
        }}
        margin={'20px auto'}
      />
    </div>
  )
}

export default Sidebar

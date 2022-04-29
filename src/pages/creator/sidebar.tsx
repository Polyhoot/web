import { useStore } from '@nanostores/react'
import {
  Anchor,
  Box,
  Button, Card, CardBody, CardFooter, CardHeader, Text,
} from 'grommet'
import { FormTrash } from 'grommet-icons'
import React from 'react'
import { addQuestion, questions, removeQuestion } from '../../stores/pack'

function Sidebar(
  props: {
    setQuestionId: (id: number) => void,
    active: number
  },
) {
  const store = useStore(questions)
  const { setQuestionId, active } = props
  return (
    <div className={'creator-sidebar'}>
      {store.map((q, index) => (
        <Card
          key={q.id}
          onClick={() => {
            console.log('click')
            setQuestionId(index)
          }}
          margin={'10px auto'}
          width={'90%'}
          className={index === active ? '.active' : undefined}
        >
          <CardHeader pad={'small'}>
            <Box margin={'auto'}>
              <Text
                margin={'auto'}
                size={'12px'}
                truncate={'tip'}
              >
                {q.text.replace(/^\s+|\s+$/g, '') === '' ? 'Question text' : q.text}
              </Text>
            </Box>
          </CardHeader>
          <CardBody pad={'small'}>
            <div className={'creator-sidebar--card_answers'}>
              {q.answers.map((answer, aI) => (
                <div
                // eslint-disable-next-line react/no-array-index-key
                  key={`${q.id}_answer${aI}`}
                  className={`creator-sidebar--card_answers__item ${answer.isCorrect ? 'correct' : null}`}
                >
                  <span>{answer.text}</span>
                </div>
              ))}
            </div>
          </CardBody>
          <CardFooter pad={'none'}>
            <Box margin={'auto 5px 5px auto'}>
              <Anchor
                size={'small'}
                icon={<FormTrash />}
                className={'creator-sidebar--card_delete'}
                onClick={(e) => {
                  e.stopPropagation()
                  if (active > index) {
                    setQuestionId(active - 1 >= 0 ? active - 1 : 0)
                  }
                  if (active === index) {
                    setQuestionId(index - 1 >= 0 ? index - 1 : 0)
                  }
                  removeQuestion(index)
                  console.log(index - 1 >= 0 ? index - 1 : 0)
                }}
              />
            </Box>
          </CardFooter>
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

import { useStore } from '@nanostores/react'
import { Form, FormField, TextInput } from 'grommet'
import React, { useState } from 'react'
import { questions } from '../../stores/pack'

function LeftSidebar(
  props: {
    updateQuestionTime: (time: number) => void,
    time: number
  },
) {
  const { updateQuestionTime, time } = props
  return (
    <div className={'left'}>
      <Form validate={'change'}>
        <FormField
          label={'Question time (seconds)'}
          width={'80%'}
          margin={'20px auto'}
          validate={
            (val) => (parseInt(val || '0', 10) > 10 ? undefined : 'Question time must be greater, than 10')
          }
        >
          <TextInput
            placeholder={'Enter number in seconds'}
            plain
            focusIndicator={false}
            value={time}
            type={'number'}
            textAlign={'center'}
            onChange={(e) => updateQuestionTime(e.target.valueAsNumber)}
          />
        </FormField>
      </Form>
    </div>
  )
}

export default LeftSidebar

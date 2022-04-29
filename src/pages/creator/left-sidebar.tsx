import { useStore } from '@nanostores/react'
import { FormField, TextInput } from 'grommet'
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
      <FormField label={'Question time (seconds)'} width={'80%'} margin={'20px auto'}>
        <TextInput
          placeholder={'Enter number in seconds'}
          plain
          focusIndicator={false}
          value={time}
          type={'number'}
          textAlign={'center'}
          onChange={(e) => updateQuestionTime(parseInt(e.target.value, 10))}
        />
      </FormField>
    </div>
  )
}

export default LeftSidebar

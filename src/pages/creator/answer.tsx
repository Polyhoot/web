import { Box, CheckBox, TextInput } from 'grommet'
import {
  Radial, Square, Sun, Trigger,
} from 'grommet-icons'
import React, { useEffect, useState } from 'react'

const styles = [
  {
    icon: <Radial color={'white'} fill={'white'} style={{ margin: 'auto' }} />,
    color: '#3D138D',
  },
  {
    icon: <Square color={'white'} fill={'white'} style={{ margin: 'auto' }} />,
    color: '#FFCA58',
  },
  {
    icon: <Trigger color={'white'} fill={'white'} style={{ margin: 'auto' }} />,
    color: '#00739D',
  },
  {
    icon: <Sun color={'white'} fill={'white'} style={{ margin: 'auto' }} />,
    color: '#00C781',
  },
]

function CreatorAnswer(
  props: {
    updateAnswerText: (text: string) => void,
    updateAnswerStatus: (status: boolean) => void,
    index: number,
    isCorrect: boolean
    defaultText: string
  },
) {
  const {
    index, updateAnswerStatus, isCorrect, defaultText, updateAnswerText,
  } = props
  // const [checked, setChecked] = useState(isCorrect)
  return (
    <div className={'creator-question--answers_item'}>
      <Box width={'10%'} height={'100%'} background={styles[index].color}>
        {styles[index].icon}
      </Box>
      <Box margin={'auto'} width={'88%'} direction={'row'}>
        <TextInput
          value={defaultText}
          onChange={(e) => {
            updateAnswerText(e.target.value)
          }}
          plain
          size={'medium'}
          placeholder={`Add answer ${index + 1}`}
          className={'creator-question--answers_item__input'}
        />
        <Box margin={'auto 10px'}>
          <CheckBox
            checked={isCorrect}
            className={'creator-question--answers_item__checkbox'}
            onChange={(event) => updateAnswerStatus(event.target.checked)}
          />
        </Box>
      </Box>
    </div>
  )
}

export default CreatorAnswer

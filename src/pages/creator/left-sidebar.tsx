import { useStore } from '@nanostores/react'
import React, { useState } from 'react'
import { questions } from '../../stores/pack'

function LeftSidebar(
  props: {
    id: number
  },
) {
  const { id } = props
  const [current, setCurrent] = useState(useStore(questions)[id])
  return (
    <div className={'left'} />
  )
}

export default LeftSidebar

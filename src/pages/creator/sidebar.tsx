import { useStore } from '@nanostores/react'
import { Card } from 'grommet'
import React from 'react'
import { questions } from '../../stores/pack'

function Sidebar() {
  const store = useStore(questions)
  return (
    <div className={'creator-sidebar'}>
      {store.map((q) => (
        <Card>
          {q.text}
        </Card>
      ))}
    </div>
  )
}

export default Sidebar

import React, { useEffect, useRef } from 'react'
import {
  useParams, useSearchParams, Routes, Route,
} from 'react-router-dom'

// eslint-disable-next-line react/no-unused-prop-types
function PlayPage(props: { socket: WebSocket }) {
  const { id } = useParams<{ id: string }>()
  const { socket } = props
  useEffect(() => {
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({
        id,
        userId: 'asdasdasd',
      }))
    })
  })
  console.log(socket)
  return (
    <div className={'Game'}>
      {id}
    </div>
  )
}

export default PlayPage

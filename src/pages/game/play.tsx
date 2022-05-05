import React, { useEffect, useRef, useState } from 'react'
import {
  useParams, useSearchParams, Routes, Route,
} from 'react-router-dom'
import getSocketUrl from '../../utils/getSocketUrl'

// eslint-disable-next-line react/no-unused-prop-types
function PlayPage(props: { socket: WebSocket }) {
  const { id } = useParams<{ id: string }>()
  const { socket } = props

  const [gamePin, setGamePin] = useState(null)

  const createGame = (uuid: string) => {
    const ws = new WebSocket(`${getSocketUrl}/game/create`)
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({
        uuid,
        packId: id,
      }))
      ws.addEventListener('message', (ev) => {
        const data = JSON.parse(ev.data)
        setGamePin(data.gamePin)
      })
    })
  }

  useEffect(() => {
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({
        clientType: 'host',
      }))
      socket.addEventListener('message', (ev) => {
        const data = JSON.parse(ev.data)
        createGame(data.uuid)
      })
    })
  })
  return (
    <div className={'Game'}>
      {gamePin}
    </div>
  )
}

export default PlayPage

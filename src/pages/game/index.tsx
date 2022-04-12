import React, { useEffect, useRef } from 'react'
import {
  useParams, useSearchParams, Routes, Route,
} from 'react-router-dom'
import PlayPage from './play'

function GamePage() {
  const socket = useRef<WebSocket>(new WebSocket('wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self'))
  return (
    <div className={'App'}>
      <Routes>
        <Route path={'/create/:packId'} />
        <Route path={'/play/:id'} element={<PlayPage socket={socket.current} />} />
      </Routes>
    </div>
  )
}

export default GamePage

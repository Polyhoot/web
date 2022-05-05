import React, { useEffect, useRef } from 'react'
import {
  useParams, useSearchParams, Routes, Route,
} from 'react-router-dom'
import getSocketUrl from '../../utils/getSocketUrl'
import PlayPage from './play'

function GamePage() {
  const socket = useRef<WebSocket>(new WebSocket(`${getSocketUrl}/connect`))
  return (
    <div className={'App'}>
      <Routes>
        {/* <Route path={'/create/:packId'} /> */}
        <Route path={'/play/:id'} element={<PlayPage socket={socket.current} />} />
      </Routes>
    </div>
  )
}

export default GamePage

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PlayPage from './play'

function GamePage() {
  return (
    <div className={'App'}>
      <Routes>
        {/* <Route path={'/create/:packId'} /> */}
        <Route path={'/play/:id'} element={<PlayPage />} />
      </Routes>
    </div>
  )
}

export default GamePage

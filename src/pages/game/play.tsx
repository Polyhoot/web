import { useStore } from '@nanostores/react'
import { Box, Spinner } from 'grommet'
import React, { useEffect, useRef, useState } from 'react'
import {
  useParams,
} from 'react-router-dom'
import {
  addPlayer, gameStore, playersStore, resetGame, socketStore,
} from '../../stores/game'
import getServerUrl from '../../utils/getServerUrl'
import getSocketUrl from '../../utils/getSocketUrl'
import Lobby from './lobby'
import QuestionPage from './question'
import Scoreboard from './scoreboard'

// eslint-disable-next-line react/no-unused-prop-types
function PlayPage() {
  const { id } = useParams<{ id: string }>()

  const game = useStore(gameStore)
  const players = useStore(playersStore)
  const socket = useStore(socketStore)

  const [isLoading, setLoading] = useState(false)

  const connectToHostSocket = (gameId: number) => {
    const ws = new WebSocket(`${getSocketUrl}/game/host`)
    socketStore.set(ws)
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({
        action: 'connect',
        gameId,
      }))
      ws.addEventListener('message', (ev) => {
        const data = JSON.parse(ev.data)
        // TODO: More types here
        if (data.action === 'player_connected') {
          addPlayer(data.name)
        }
      })
    })
  }

  const getPack = async () => {
    const response = await fetch(`${getServerUrl}pack/get/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const result = await response.json()
      gameStore.setKey('pack', result)
    }
  }

  const createGame = async () => {
    await getPack()
    const ws = new WebSocket(`${getSocketUrl}/game/create`)
    ws.addEventListener('open', () => {
      ws.send('ping')
      ws.addEventListener('message', async (ev) => {
        const data = JSON.parse(ev.data)
        connectToHostSocket(data.gameId)
        gameStore.setKey('gamePin', data.gameId)
        setLoading(false)
      })
    })
  }

  useEffect(() => {
    createGame()
    return () => resetGame()
  }, [])

  if (isLoading) {
    return (
      <Box width={'100%'} height={'100%'}>
        <Spinner size={'large'} margin={'auto'} />
      </Box>
    )
  }
  switch (game.status) {
    case 'LOBBY':
      return (
        <Lobby />
      )
    case 'QUESTION':
      return (
        <QuestionPage socket={socket} />
      )
    case 'SCOREBOARD':
      return (
        <Scoreboard />
      )
    default:
      return (
        <>
        </>
      )
  }
}

export default PlayPage

import { useStore } from '@nanostores/react'
import { Box, Spinner } from 'grommet'
import React, { useEffect, useState } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'
import {
  addPlayer, gameStore, playersStore, resetGame, socketStore, updatePlayerStatus,
} from '../../stores/game'
import getServerUrl from '../../utils/getServerUrl'
import getSocketUrl from '../../utils/getSocketUrl'
import Lobby from './lobby'
import QuestionPage from './question/question'
import Scoreboard from './scoreboard'

// eslint-disable-next-line react/no-unused-prop-types
function PlayPage() {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  const game = useStore(gameStore)
  const socket = useStore(socketStore)

  const [isLoading, setLoading] = useState(false)

  const end = () => {
    socket.send(JSON.stringify({
      action: 'end',
    }))
    navigate('/')
    resetGame()
    playersStore.set([])
  }

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
        if (data.action === 'player_disconnected') {
          updatePlayerStatus(data.name, false)
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
        <Lobby socket={socket} />
      )
    case 'QUESTION':
      return (
        <QuestionPage socket={socket} />
      )
    case 'SCOREBOARD':
      return (
        <Scoreboard finished={false} end={() => end()} />
      )
    case 'FINISHED':
      return (
        <Scoreboard finished end={() => end()} />
      )
    default:
      return (
        <>
        </>
      )
  }
}

export default PlayPage

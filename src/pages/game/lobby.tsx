import { useStore } from '@nanostores/react'
import {
  Box, Button, Header, Page, Text, Heading,
} from 'grommet'
import { User } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { changeGameStatus, gameStore, playersStore } from '../../stores/game'

function Lobby(
  props: {
    socket: WebSocket
  },
) {
  const { socket } = props
  const game = useStore(gameStore)
  const players = useStore(playersStore)
  const [isCountingDown, setCountingDown] = useState(false)
  const [timer, setTimer] = useState(5)
  useEffect(() => {
    if (isCountingDown) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      if (timer < 1) {
        changeGameStatus('QUESTION')
      }
      return () => clearInterval(interval)
    }
    return () => undefined
  }, [timer, isCountingDown])

  useEffect(() => {
    if (isCountingDown) {
      socket.send(JSON.stringify({
        action: 'start_game',
      }))
    }
  }, [isCountingDown])

  if (isCountingDown) {
    return (
      <Page background={'neutral-2'} height={'100%'} style={{ position: 'relative' }}>
        <Heading level={1} color={'white'} margin={'50px auto'}>{'Get ready!'}</Heading>
        <Box
          style={{
            borderRadius: '50%',
            background: 'white',
            width: '80px',
            height: '80px',
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translateY(-50%) translateX(-50%)',
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: '72px',
              margin: 'auto',
            }}
            weight={'bold'}
          >
            {timer}
          </Text>
        </Box>
      </Page>
    )
  }

  return (
    <Page background={'neutral-2'} height={'100%'}>
      <Header
        justify={'center'}
        background={'brand'}
        height={'25%'}
      >
        <Box
          width={'50%'}
          margin={'auto'}
          background={'white'}
          style={{
            padding: '20px 40px',
            borderRadius: '4px',
            boxShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px 0px',
          }}
        >
          <Box
            margin={'auto'}
          >
            <Text alignSelf={'start'} size={'large'}>{'Game PIN:'}</Text>
            <Text weight={900} size={'84px'}>{game.gamePin}</Text>
          </Box>
        </Box>

      </Header>
      <Box
        style={{
          position: 'relative',
        }}
      >
        <Header>
          <Box
            background={'rgba(0, 0, 0, 0.7)'}
            style={{
              marginTop: '10px',
              marginLeft: '10px',
              borderRadius: '7px',
              width: 'fit-content',
              padding: '15px 20px',
            }}
          >
            <Box margin={'auto'} direction={'row'}>
              <User />
              <Text margin={'0 0 0 8px'}>{players.length}</Text>
            </Box>
          </Box>
          <Box
            margin={'auto 50px'}
          >
            <Button
              primary
              label={'Start'}
              disabled={players.length < 1}
              onClick={() => setCountingDown(true)}
            />
          </Box>
        </Header>
        <Box
          direction={'row-responsive'}
          style={{
            padding: '50px 200px',
          }}
        >
          {players.map((player) => (
            <Box
              key={player.name}
              background={'rgba(0, 0, 0, 0.7)'}
              style={{
                padding: '15px 20px',
                width: 'fit-content',
              }}
              margin={'auto'}
            >
              <Text margin={'auto'}>{player.name}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Page>
  )
}

export default Lobby

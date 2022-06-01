import { atom, map } from 'nanostores'
import { Pack } from '../domain/Pack'

export interface Game {
  gamePin?: number,
  pack?: Pack,
  question: number,
  status: 'LOBBY' | 'QUESTION' | 'SCOREBOARD' | 'FINISHED',
  connectedPlayers: number
}
export interface Player {
  name: string,
  score: number,
  isConnected: boolean
}

export const gameStore = map<Game>({
  question: 0,
  status: 'LOBBY',
  connectedPlayers: 0,
})

export const playersStore = atom<Player[]>([])

export const socketStore = atom<WebSocket>()

export const addPlayer = (name: string) => {
  const arr = playersStore.get()
  arr.push({
    name,
    score: 0,
    isConnected: true,
  })
  playersStore.set(arr)
  gameStore.setKey('connectedPlayers', gameStore.get().connectedPlayers + 1)
}

export const updatePlayerStatus = (name: string, isConnected: boolean) => {
  if (gameStore.get().status === 'LOBBY') {
    playersStore.set(playersStore.get().filter((p) => p.name !== name))
  } else {
    const arr = playersStore.get()
    const index = arr.findIndex((player) => player.name === name)
    arr[index].isConnected = isConnected
    playersStore.set(arr)
  }
  gameStore.setKey('connectedPlayers', gameStore.get().connectedPlayers - 1)
}

export const updatePlayerScore = (name: string, score: number) => {
  const arr = playersStore.get()
  const index = arr.findIndex((player) => player.name === name)
  arr[index].score = score
  playersStore.set(arr)
}

export const changeGameStatus = (status: 'LOBBY' | 'QUESTION' | 'SCOREBOARD' | 'FINISHED') => {
  gameStore.setKey('status', status)
}

export const nextQuestion = () => {
  const { pack } = gameStore.get()
  if (pack && pack.questions.length - 1 > gameStore.get().question) {
    gameStore.setKey('question', gameStore.get().question + 1)
    gameStore.setKey('status', 'QUESTION')
  } else {
    gameStore.setKey('status', 'FINISHED')
  }
}

export const resetGame = () => {
  gameStore.set({
    question: 0,
    status: 'LOBBY',
    connectedPlayers: 0,
  })
}

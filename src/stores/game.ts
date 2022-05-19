import { atom, map } from 'nanostores'
import { Pack } from '../domain/Pack'

export interface Game {
  gamePin?: number,
  pack?: Pack,
  question: number,
  status: 'LOBBY' | 'QUESTION' | 'SCOREBOARD' | 'FINISHED'
}
export interface Player {
  name: string,
  score: number
}

export const gameStore = map<Game>({
  question: 0,
  status: 'LOBBY',
})

export const playersStore = atom<Player[]>([])

export const socketStore = atom<WebSocket>()

export const addPlayer = (name: string) => {
  const arr = playersStore.get()
  arr.push({
    name,
    score: 0,
  })
  playersStore.set(arr)
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
  })
}

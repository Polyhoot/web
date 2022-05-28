import { cleanStores } from 'nanostores'
import { Pack } from '../../domain/Pack'
import {
  gameStore, Game, nextQuestion, changeGameStatus, resetGame,
} from '../../stores/game'
import { testPack } from './constants'

test('gameStore: is clear on init', () => {
  expect(gameStore.get()).toStrictEqual<Game>({
    question: 0,
    status: 'LOBBY',
  })
})

test('gameStore: pack setting', () => {
  gameStore.setKey('pack', testPack)
  expect(gameStore.get().pack).toStrictEqual<Pack>(testPack)
})

test('gameStore: next question', () => {
  nextQuestion()
  const store = gameStore.get()
  expect(store.question).toBe<number>(1)
  expect(store.status).toBe('QUESTION')
})

test('gameStore: update status', () => {
  changeGameStatus('SCOREBOARD')
  expect(gameStore.get().status).toBe('SCOREBOARD')
})

test('gameStore: next question finishes game', () => {
  nextQuestion()
  const store = gameStore.get()
  expect(store.question).toBe<number>(1)
  expect(store.status).toBe('FINISHED')
})

test('gameStore: correct storage cleanup', () => {
  resetGame()
  expect(gameStore.get()).toStrictEqual<Game>({
    question: 0,
    status: 'LOBBY',
  })
})

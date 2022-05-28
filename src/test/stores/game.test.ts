import { cleanStores } from 'nanostores'
import { Pack } from '../../domain/Pack'
import {
  gameStore, Game, nextQuestion, changeGameStatus, resetGame,
  playersStore, addPlayer, updatePlayerScore,
} from '../../stores/game'
import { testPack } from './constants'

describe('gameStore:', () => {
  test('is clear on init', () => {
    expect(gameStore.get()).toStrictEqual<Game>({
      question: 0,
      status: 'LOBBY',
    })
  })

  test('pack setting', () => {
    gameStore.setKey('pack', testPack)
    expect(gameStore.get().pack).toStrictEqual<Pack>(testPack)
  })

  test('next question', () => {
    nextQuestion()
    const store = gameStore.get()
    expect(store.question).toBe<number>(1)
    expect(store.status).toBe('QUESTION')
  })

  test('update status', () => {
    changeGameStatus('SCOREBOARD')
    expect(gameStore.get().status).toBe('SCOREBOARD')
  })

  test('next question finishes game', () => {
    nextQuestion()
    const store = gameStore.get()
    expect(store.question).toBe<number>(1)
    expect(store.status).toBe('FINISHED')
  })

  test('correct storage cleanup', () => {
    resetGame()
    expect(gameStore.get()).toStrictEqual<Game>({
      question: 0,
      status: 'LOBBY',
    })
  })
})

describe('playersStore:', () => {
  test('is clear on init', () => {
    expect(playersStore.get()).toStrictEqual([])
  })

  test('add player', () => {
    addPlayer('test player')
    addPlayer('test player 2')
    expect(playersStore.get()).toStrictEqual([{
      name: 'test player',
      score: 0,
    },
    {
      name: 'test player 2',
      score: 0,
    },
    ])
  })

  test('update score', () => {
    updatePlayerScore('test player', 130)
    expect(playersStore.get()).toStrictEqual([{
      name: 'test player',
      score: 130,
    },
    {
      name: 'test player 2',
      score: 0,
    },
    ])
  })
})

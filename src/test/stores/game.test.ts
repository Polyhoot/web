import { gameStore, Game } from '../../stores/game'

test('gameStore: is clear on init', () => {
  expect(gameStore.get()).toBe<Game>({
    question: 0,
    status: 'LOBBY',
  })
})

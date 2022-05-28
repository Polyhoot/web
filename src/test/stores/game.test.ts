import { gameStore, Game } from '../../stores/game'

test('gameStore: is clear on init', () => {
  expect(gameStore.get()).toStrictEqual<Game>({
    question: 0,
    status: 'LOBBY',
  })
})

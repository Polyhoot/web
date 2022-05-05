import { map } from 'nanostores'
import { Pack } from './pack'

export interface Game {
  gamePin: number,
  pack: Pack,
  players: Player[],
}

export interface Player {
  name: string,
  score: number
}

export const game = map<Game>()

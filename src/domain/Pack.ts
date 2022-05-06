import { Question } from './Question'

export interface Pack {
  name: string,
  id: string,
  questions: Question[],
  author: string,
  createdAt: string
}

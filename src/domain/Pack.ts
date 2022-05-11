import { Question } from './Question'

export interface Pack {
  name: string,
  id: string,
  questions: Question[],
  authorName: string,
  authorId: string,
  createdAt: string
}

import { atom, map, WritableAtom } from 'nanostores'
import { Question } from '../domain/Question'

export interface Pack {
  name: string,
  questions: WritableAtom<Question[]>
}
export const questions = atom<Question[]>([])

export function addQuestion(q: Question) {
  questions.set([...questions.get(), q])
}
export function removeQuestion(i: number) {
  questions.set(questions.get().splice(i, 1))
}
export function editQuestion(i: number, q: Question) {
  const questionsArray = questions.get()
  questionsArray[i] = q
  questions.set(questionsArray)
}

export const pack = map<Pack>({
  name: '',
  questions,
})

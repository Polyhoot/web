import { nanoid } from 'nanoid'
import { atom, map, WritableAtom } from 'nanostores'
import { Question } from '../domain/Question'

export interface Pack {
  name: string,
  questions: WritableAtom<Question[]>
}
export const questions = atom<Question[]>([{
  text: '',
  time: 20,
  type: 0,
  id: nanoid(6),
  answers: [
    {
      text: '',
      isCorrect: true,
    },
    {
      text: '',
      isCorrect: false,
    },
    {
      text: '',
      isCorrect: false,
    },
    {
      text: '',
      isCorrect: false,
    },
  ],
}])

export function addQuestion() {
  questions.set([...questions.get(), {
    text: '',
    time: 20,
    type: 0,
    id: nanoid(5),
    answers: [
      {
        text: '',
        isCorrect: true,
      },
      {
        text: '',
        isCorrect: false,
      },
      {
        text: '',
        isCorrect: false,
      },
      {
        text: '',
        isCorrect: false,
      },
    ],
  }])
}

export function updateAnswerText(questionIndex: number, text: string, index: number) {
  const updated = [...questions.get()]
  updated[questionIndex].answers[index].text = text
  questions.set(updated)
}

export function updateTitle(questionIndex: number, text: string) {
  const updated = [...questions.get()]
  updated[questionIndex].text = text
  questions.set(updated)
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

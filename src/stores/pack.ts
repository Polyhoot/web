import { nanoid } from 'nanoid'
import { atom, map } from 'nanostores'
import {
  createMedia, Picture, Question, Video,
} from '../domain/Question'

export interface PackStore {
  name: string,
  id?: string
}

export const createQuestion = (): Question => (
  {
    text: '',
    time: 20,
    type: 0,
    id: nanoid(5),
    media: null,
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
  }
)

export const questions = atom<Question[]>([createQuestion()])

export function addQuestion() {
  questions.set([...questions.get(), createQuestion()])
}

export function updateAnswerText(questionIndex: number, text: string, index: number) {
  const updated = [...questions.get()]
  updated[questionIndex].answers[index].text = text
  questions.set(updated)
}

export function updateAnswerStatus(questionIndex: number, index: number, status: boolean) {
  const updated = [...questions.get()]
  updated[questionIndex].answers[index].isCorrect = status
  questions.set(updated)
}

export function updateTitle(questionIndex: number, text: string) {
  const updated = [...questions.get()]
  updated[questionIndex].text = text
  questions.set(updated)
}
export function updateQuestionTime(questionIndex: number, time: number) {
  const updated = [...questions.get()]
  updated[questionIndex].time = time
  questions.set(updated)
}

export function removeQuestion(i: number) {
  const updated = questions.get()
  updated.splice(i, 1)
  if (updated.length < 1) {
    updated.push(createQuestion())
  }
  questions.set(updated)
}
export function editQuestion(i: number, q: Question) {
  const questionsArray = questions.get()
  questionsArray[i] = q
  questions.set(questionsArray)
}

export function updateMedia(i: number, m: Video | Picture) {
  const updated = [...questions.get()]
  updated[i].media = createMedia(m)
  questions.set(updated)
}

export const pack = map<PackStore>({
  name: '',
})

export function updatePackId(id: string) {
  pack.setKey('id', id)
}

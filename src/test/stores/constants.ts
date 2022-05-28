import { Pack } from '../../domain/Pack'
import { Question } from '../../domain/Question'

export const testQuestion: Question = {
  text: 'Is it working?',
  time: 20,
  type: 0,
  id: 'testQuestionId',
  media: null,
  answers: [
    {
      text: 'No!',
      isCorrect: true,
    },
    {
      text: 'Yes!',
      isCorrect: false,
    },
    {
      text: 'Not yet',
      isCorrect: false,
    },
    {
      text: 'Will be soon',
      isCorrect: false,
    },
  ],
}

export const testPack: Pack = {
  name: 'Test',
  id: 'helloworld',
  questions: [testQuestion, testQuestion],
  authorName: 'Test author',
  authorId: 'authorid',
  createdAt: 'Sat May 28 2022 14:37:51 GMT+0300 (Moscow Standard Time)',
}

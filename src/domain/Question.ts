interface Question {
  text: string,
  time: number,
  type: 0 | 1,
  media?: Picture | Video,
  answers?: Answer[]
}

interface Answer {
  text: string,
  isCorrect: boolean
}

interface Picture {
  url: string
}
interface Video {
  url: string
  hideName: boolean,
  startTime: number,
  length: number
}

export type { Question, Picture, Video }

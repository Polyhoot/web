interface Question {
  text: string,
  time: number,
  type: 0 | 1,
  media: Media | null,
  answers: Answer[],
  id: string
}

export interface Media {
  url: string
  hideName: boolean | null,
  startTime: number | null,
  length: number | null,
  type: 'video' | 'picture',
}

export const createMedia = (
  media: Video | Picture,
): Media => {
  if (media.type === 'video') {
    return media
  }
  return {
    ...media,
    hideName: null,
    startTime: null,
    length: null,
  }
}

interface Answer {
  text: string,
  isCorrect: boolean
}

interface Picture {
  url: string,
  type: 'picture'
}
interface Video {
  url: string
  hideName: boolean,
  startTime: number,
  length: number,
  type: 'video'
}

export type { Question, Picture, Video }

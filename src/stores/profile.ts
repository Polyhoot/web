import { map } from 'nanostores'

export interface ProfileValue {
  name: string,
  email?: string,
  userId?: string,
  avatar?: string
}

export const profile = map<ProfileValue>({
  name: 'anonymous',
})

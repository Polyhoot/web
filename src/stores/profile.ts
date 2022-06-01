import { map } from 'nanostores'

export interface ProfileValue {
  name: string,
  email?: string,
  packs?: string[],
  gravatar?: string,
}

export const profile = map<ProfileValue>({
  name: 'anonymous',
})

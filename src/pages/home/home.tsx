import React from 'react'
import { Text } from 'grommet'
import { useStore } from '@nanostores/react'
import { profile } from '../../stores/profile'

function Home() {
  const user = useStore(profile)
  return (
    <div className={'Home'}>
      <Text margin={'none'}>{user.name}</Text>
    </div>
  )
}

export default Home

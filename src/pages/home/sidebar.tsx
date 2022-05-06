import { useStore } from '@nanostores/react'
import { Box, Text, Anchor } from 'grommet'
import React from 'react'
import { profile } from '../../stores/profile'

function SidebarRight() {
  const store = useStore(profile)
  return (
    <Box>
      {store.name}
      {store.email}
    </Box>
  )
}

export default SidebarRight

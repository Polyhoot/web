import { Box } from 'grommet'
import React from 'react'
import { Pack } from '../../../domain/Pack'
import MyPacks from './myPacks'

function SidebarRight(
  props: { packs: Pack[] },
) {
  const { packs } = props
  return (
    <Box>
      <MyPacks packs={packs} />
    </Box>
  )
}

export default SidebarRight

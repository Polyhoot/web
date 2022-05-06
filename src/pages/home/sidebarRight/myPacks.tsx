import { Box, Anchor, Text } from 'grommet'
import React from 'react'
import { Pack } from '../../../domain/Pack'

function MyPacks(
  props: {
    packs: Pack[]
  },
) {
  const { packs } = props
  return (
    <>
      {packs.map((pack, i) => {
        if (i > 2) return null
        return (
          <Box>
            <Box>{pack.questions.length}</Box>
            <Box>
              <Box>
                <Text>{pack.name}</Text>
              </Box>
              <Box>
                <Text>
                  {'Author'}
                  <Anchor>
                    {pack.author}
                  </Anchor>
                </Text>
              </Box>
            </Box>
          </Box>
        )
      })}
    </>
  )
}

export default MyPacks

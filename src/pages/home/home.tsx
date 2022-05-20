import React, { useEffect, useState } from 'react'
import {
  Box, Grid, Heading, Page, Spinner, Text,
} from 'grommet'
import { toast } from 'react-toastify'
import { useStore } from '@nanostores/react'
import { profile } from '../../stores/profile'
import './home.scss'
import { Pack } from '../../domain/Pack'
import getServerUrl from '../../utils/getServerUrl'
import SidebarRight from './sidebarRight/sidebarRight'

function Home() {
  const user = useStore(profile)
  const [myPacks, setMyPacks] = useState<Pack[]>()
  const [loading, setLoading] = useState(true)

  const getUserPacks = async () => {
    const result: {
      packs: Pack[]
    } = await fetch(`${getServerUrl}pack/get/my?max=30`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => res.json()).catch((e) => toast.error(e.text))
    if (result) {
      setMyPacks(result.packs)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUserPacks()
  }, [])

  if (user.email && myPacks && !loading) {
    return (
      <div className={'Home'}>
        <Grid
          rows={['100%']}
          className={'Home-grid'}
          margin={'auto'}
          fill
          columns={['small', 'medium', 'xsmall']}
          gap={'small'}
          areas={[
            { name: 'sidebar', start: [0, 0], end: [1, 0] },
            { name: 'main', start: [1, 0], end: [2, 0] },
            { name: 'sidebar-right', start: [2, 0], end: [3, 0] },
          ]}
        >
          <Box gridArea={'sidebar'} background={'light-4'} />
          <Box gridArea={'main'} background={'light-5'}>
            <Box margin={'auto'}>
              <Text>{'Noting here yet! Here will be the news!'}</Text>
            </Box>
          </Box>
          <Box gridArea={'sidebar-right'} background={'light-2'}>
            <Heading size={'small'}>{'My packs'}</Heading>
            <SidebarRight packs={myPacks} />
          </Box>
        </Grid>
      </div>
    )
  }
  if (loading) {
    return (
      <Box width={'100%'} height={'100%'}>
        <Spinner size={'large'} margin={'auto'} />
      </Box>
    )
  }
  return (
    <Page width={'100%'} height={'100%'}>
      <Box margin={'auto'}>
        <Heading margin={'auto'}>
          {'Welcome to Polyhoot!'}
        </Heading>
      </Box>
    </Page>
  )
}

export default Home

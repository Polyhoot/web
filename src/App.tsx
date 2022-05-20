import React, { useEffect, useState } from 'react'
import './App.scss'
import {
  Anchor,
  Avatar, Box, Button, Header, Menu, Spinner, Text,
} from 'grommet'
import {
  AddCircle, Login, UserFemale, Compass, HomeRounded, Download,
} from 'grommet-icons'
import { useNavigate, Outlet } from 'react-router-dom'
import { useStore } from '@nanostores/react'
import { profile } from './stores/profile'
import getServerUrl from './utils/getServerUrl'
import UserInfoResponse from './domain/UserInfoResponse'

function App() {
  const user = useStore(profile)
  const [loading, setLoading] = useState(true)
  const getUserData = async (token: string) => {
    const result: UserInfoResponse = await fetch(`${getServerUrl}user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
    if (result.email) {
      profile.set(result)
    }
    setLoading(false)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getUserData(token)
    } else {
      setLoading(false)
    }
  }, [])
  const navigate = useNavigate()
  if (loading) {
    return (
      <div className={'App'}>
        <Spinner size={'large'} margin={'auto'} />
      </div>
    )
  }
  if (!user.email) {
    return (
      <div className={'App'}>
        <Header>
          <Button icon={<HomeRounded />} onClick={() => navigate('/')} />
          <Box direction={'row'} width={'300px'} justify={'between'} margin={'auto 20px auto auto'}>
            <Button icon={<Login />} onClick={() => navigate('/login')} label={'Login'} secondary />
            <Button icon={<AddCircle />} onClick={() => navigate('/register')} label={'Register'} />
          </Box>
        </Header>
        <Outlet />
      </div>
    )
  }
  return (
    <div className={'App'}>
      <Header
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px 0px',
        }}
      >
        <Box direction={'row'} width={'190px'} justify={'between'} margin={'auto 0px auto 20px'}>
          <Anchor icon={<HomeRounded />} label={'Home'} onClick={() => navigate('/')} />
          <Anchor icon={<Compass />} label={'Discover'} />
        </Box>
        <Box direction={'row'}>
          <Box margin={'auto 0'}>
            <Button icon={<Download />} onClick={() => navigate('/import')} label={'Import'} size={'small'} />
          </Box>
          <Box margin={'auto 20px'}>
            <Button icon={<AddCircle />} onClick={() => navigate('/creator')} label={'Create'} size={'small'} />
          </Box>
          <Menu
            label={(
              <Box>
                <Box direction={'row'} gap={'small'}>
                  <Avatar background={'accent-2'}>
                    <UserFemale color={'accent-1'} />
                  </Avatar>
                  <Text alignSelf={'center'}>{user.name}</Text>
                </Box>
              </Box>
        )}
            items={[
              {
                label: 'Profile',
                onClick: () => {
                  navigate('/profile')
                },
              },
              {
                label: 'Logout',
                onClick: () => {
                  localStorage.removeItem('token')
                  navigate('/', { replace: true })
                  // eslint-disable-next-line no-restricted-globals
                  location.reload()
                },
              },
            ]}
          />
        </Box>
      </Header>
      <Box
        style={{
          height: 'calc(100% - 72px)',
        }}
      >
        <Outlet />
      </Box>
    </div>
  )
}

export default App

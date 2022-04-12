import React from 'react'
import './App.scss'
import {
  Avatar, Box, Button, Header, Menu, Text,
} from 'grommet'
import {
  AddCircle, Home, Login, UserFemale,
} from 'grommet-icons'
import { useNavigate, Outlet } from 'react-router-dom'
import { useStore } from '@nanostores/react'
import { profile } from './stores/profile'

function App() {
  const user = useStore(profile)
  const navigate = useNavigate()
  if (!user.userId) {
    return (
      <div className={'App'}>
        <Header>
          <Button icon={<Home />} onClick={() => navigate('/')} />
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
      <Header>
        <Button icon={<Home />} onClick={() => navigate('/')} />
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
                localStorage.removeItem('default')
                navigate('/', { replace: true })
              },
            },
          ]}
        />
      </Header>
      <Outlet />
    </div>
  )
}

export default App

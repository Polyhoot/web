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
          <Button icon={<Login />} onClick={() => navigate('/login')} label={'Login'} secondary />
          <Button icon={<AddCircle />} onClick={() => navigate('/register')} label={'Register'} />
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

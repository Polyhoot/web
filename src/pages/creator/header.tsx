import {
  Box,
  Button, FormField, Header, TextInput,
} from 'grommet'
import { Home } from 'grommet-icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CreatorHeader() {
  const navigate = useNavigate()
  return (
    <Header
      height={'100%'}
      style={{
        position: 'relative',
        boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px 0px',
      }}
    >
      <Button icon={<Home />} onClick={() => navigate('/')} alignSelf={'center'} />
      <Box width={'200px'}>
        <TextInput placeholder={'Enter pack name...'} className={'header-input'} />
      </Box>
      {'Header'}
    </Header>
  )
}

export default CreatorHeader

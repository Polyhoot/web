import {
  Anchor,
  Box,
  Button, FormField, Header, TextInput,
} from 'grommet'
import { CloudUpload, Home } from 'grommet-icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { pack } from '../../stores/pack'

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
        <TextInput
          placeholder={'Enter pack name...'}
          className={'header-input'}
          onChange={(e) => {
            pack.setKey('name', e.target.value)
          }}
        />
      </Box>
      <Box margin={'auto 30px auto auto'}>
        <Button primary icon={<CloudUpload />} label={'Save'} />
      </Box>
    </Header>
  )
}

export default CreatorHeader

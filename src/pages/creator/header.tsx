/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box,
  Button, Header, Text, TextInput,
} from 'grommet'
import { CloudUpload, Home } from 'grommet-icons'
import React from 'react'
import Switch from 'react-switch'
import { useNavigate } from 'react-router-dom'
import { pack } from '../../stores/pack'

function CreatorHeader(
  props: {
    savePack: () => void,
    toggleAutosave: () => void,
    autoSave: boolean,
    exit: () => void,
  },
) {
  const navigate = useNavigate()
  const {
    savePack, toggleAutosave, autoSave, exit,
  } = props
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
      <Box
        margin={'auto 30px auto auto'}
        direction={'row'}
      >
        <Box margin={'auto 20px'}>
          <label style={{
            display: 'flex',
            flexDirection: 'row',
          }}
          >
            <Text margin={'auto'}>{'Autosave'}</Text>
            <Switch
              className={'switch-toggle'}
              onChange={() => toggleAutosave()}
              checked={autoSave}
            />
          </label>
        </Box>
        <Button secondary label={'Exit'} onClick={() => exit()} />
        <Button primary icon={<CloudUpload />} label={'Save'} onClick={() => savePack()} margin={'auto 20px'} />
      </Box>
    </Header>
  )
}

export default CreatorHeader

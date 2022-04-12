import {
  Anchor,
  Box, Button, FormField, Heading, Page, TextInput,
} from 'grommet'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  return (
    <Page height={'100vh'}>
      <Box width={'300px'} flex justify={'center'} alignSelf={'center'}>
        <Heading level={2} margin={'30px auto'}>{'Login'}</Heading>
        <FormField label={'Email'}>
          <TextInput placeholder={'admin@gmail.com'} name={'polyhoot-email'} />
        </FormField>
        <FormField label={'Password'}>
          <TextInput type={'password'} name={'polyhoot-password'} />
        </FormField>
        <Box direction={'row'} margin={'10px'}>
          <Anchor
            label={'Create Account'}
            onClick={() => navigate('/register')}
            alignSelf={'start'}
            margin={'auto 0'}
          />
          <Button primary label={'Login'} className={'login-button'} alignSelf={'end'} margin={'auto 0 auto auto'} />
        </Box>
      </Box>
    </Page>
  )
}

export default LoginPage

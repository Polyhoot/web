import {
  Anchor,
  Box, Button, FormField, Heading, Page, TextInput,
} from 'grommet'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()
  return (
    <Page height={'100vh'}>
      <Box width={'300px'} flex justify={'center'} alignSelf={'center'}>
        <Heading level={2} margin={'30px auto'}>{'Create account'}</Heading>
        <form autoComplete={'off'}>
          <FormField label={'You name'}>
            <TextInput placeholder={'Vasya petrov'} name={'polyhoot-name'} autoComplete={'off'} />
          </FormField>
          <FormField label={'Email'}>
            <TextInput placeholder={'admin@gmail.com'} name={'polyhoot-email'} autoComplete={'new-password'} />
          </FormField>
          <FormField label={'Password'}>
            <TextInput type={'password'} placeholder={'Your password'} name={'polyhoot-password'} autoComplete={'new-password'} />
          </FormField>
          <FormField label={'Confirm password'}>
            <TextInput type={'password'} placeholder={'Your password again'} name={'polyhoot-password'} autoComplete={'new-password'} />
          </FormField>
          <Box direction={'row'} margin={'20px 0'}>
            <Anchor
              label={'Login'}
              onClick={() => navigate('/login')}
              alignSelf={'start'}
              margin={'auto 0'}
            />
            <Button primary label={'Create Account'} className={'login-button'} alignSelf={'end'} margin={'auto 0 auto auto'} />
          </Box>
        </form>
      </Box>
    </Page>
  )
}

export default RegisterPage

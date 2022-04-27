import {
  Anchor,
  Box, Button, Form, FormField, Heading, Page, TextInput,
} from 'grommet'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateUserResponse from '../../domain/CreateUserResponse'
import getServerUrl from '../../utils/getServerUrl'
import validateEmail from '../../utils/validateEmail'

function LoginPage() {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async () => {
    const response: CreateUserResponse = await fetch(`${getServerUrl}user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(
      (res) => res.json(),
    )

    if (response.token) {
      localStorage.setItem('token', response.token)
      navigate('/')
    } else {
      // eslint-disable-next-line no-alert
      alert(response.errorMessage)
    }
  }

  const handleInput = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = (ev.target) as HTMLInputElement
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  return (
    <Page height={'100vh'}>
      <Box width={'300px'} flex justify={'center'} alignSelf={'center'}>
        <Heading level={2} margin={'30px auto'}>{'Login'}</Heading>
        <Form validate={'blur'} onSubmit={handleSubmit}>
          <FormField label={'Email'} name={'email'} validate={{ regexp: validateEmail, status: 'error', message: 'Provide valid email' }}>
            <TextInput
              placeholder={'admin@gmail.com'}
              name={'email'}
              type={'email'}
              onInput={handleInput}
            />
          </FormField>
          <FormField label={'Password'}>
            <TextInput type={'password'} name={'password'} placeholder={'Your password'} onInput={handleInput} />
          </FormField>
          <Box direction={'row'} margin={'10px'}>
            <Anchor
              label={'Create Account'}
              onClick={() => navigate('/register')}
              alignSelf={'start'}
              margin={'auto 0'}
            />
            <Button
              primary
              label={'Login'}
              className={'login-button'}
              alignSelf={'end'}
              margin={'auto 0 auto auto'}
              type={'submit'}
            />
          </Box>
        </Form>
      </Box>
    </Page>
  )
}

export default LoginPage

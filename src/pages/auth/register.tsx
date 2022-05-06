import {
  Anchor,
  Box, Button, Form, FormField, Heading, Page, TextInput,
} from 'grommet'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import validateEmail from '../../utils/validateEmail'
import validatePassword from '../../utils/validatePassword'
import getServerUrl from '../../utils/getServerUrl'
import CreateUserResponse from '../../domain/CreateUserResponse'

function RegisterPage() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: '',
  })

  const handleSubmit = async () => {
    const response: CreateUserResponse = await fetch(`${getServerUrl}user/create`, {
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
      toast.error(response.errorMessage)
    }
  }

  const handleInput = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = (ev.target) as HTMLInputElement
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  return (
    <Page height={'100vh'}>
      <Box width={'300px'} flex justify={'center'} alignSelf={'center'}>
        <Heading level={2} margin={'30px auto'}>{'Create account'}</Heading>
        <Form autoComplete={'off'} validate={'blur'} onSubmit={handleSubmit}>
          <FormField label={'You name'} name={'name'}>
            <TextInput placeholder={'Vasya Petrov'} name={'name'} autoComplete={'off'} onInput={handleInput} />
          </FormField>
          <FormField label={'Email'} name={'email'} validate={{ regexp: validateEmail, status: 'error', message: 'Provide valid email' }}>
            <TextInput placeholder={'admin@gmail.com'} name={'email'} autoComplete={'new-password'} type={'email'} onInput={handleInput} />
          </FormField>
          <FormField label={'Password'} name={'password'} validate={{ regexp: validatePassword, message: 'Minimum eight characters, at least one letter and one number' }}>
            <TextInput type={'password'} placeholder={'Your password'} onInput={handleInput} name={'password'} autoComplete={'new-password'} />
          </FormField>
          <FormField
            label={'Confirm password'}
            name={'password-confirm'}
            validate={(val) => (val === credentials.password ? undefined : "Passwords aren't the same")}
          >
            <TextInput type={'password'} placeholder={'Your password again'} name={'password-confirm'} autoComplete={'new-password'} />
          </FormField>
          <Box direction={'row'} margin={'20px 0'}>
            <Anchor
              label={'Login'}
              onClick={() => navigate('/login')}
              alignSelf={'start'}
              margin={'auto 0'}
            />
            <Button primary type={'submit'} label={'Create Account'} className={'login-button'} alignSelf={'end'} margin={'auto 0 auto auto'} />
          </Box>
        </Form>
      </Box>
    </Page>
  )
}

export default RegisterPage

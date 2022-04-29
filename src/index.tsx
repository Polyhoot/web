import React from 'react'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Grommet, Text } from 'grommet'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Home from './pages/home/home'
import GamePage from './pages/game'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import CreatorPage from './pages/creator'

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
  checkBox: {
    check: {
      radius: '50%',
    },
  },
}

const element = document.getElementById('root')
if (!element) throw Error('No root')
const root = createRoot(element)

root.render(
  <Grommet theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />}>
          <Route index element={<Home />} />
          <Route path={'profile'} element={<Text>{'Hello profile'}</Text>} />
        </Route>
        <Route path={'creator'} element={<CreatorPage />} />
        <Route path={'game/*'} element={<GamePage />} />
        <Route path={'login/*'} element={<LoginPage />} />
        <Route path={'register/*'} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </Grommet>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log)

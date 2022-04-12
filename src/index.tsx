import React from 'react'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Grommet, Text } from 'grommet'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Home from './pages/home/home'
import GamePage from './pages/game'

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
}

const element = document.getElementById('root')
if (!element) throw Error('No root')
const root = createRoot(element)

root.render(
  <React.StrictMode>
    <Grommet theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<App />}>
            <Route index element={<Home />} />
            <Route path={'profile'} element={<Text>{'Hello profile'}</Text>} />
          </Route>
          <Route path={'game/*'} element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </Grommet>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)

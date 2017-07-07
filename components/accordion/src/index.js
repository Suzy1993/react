import React from 'react'
import { render } from 'react-dom'
import App from './App'

require('./styles/style.global.css');

render(
  <App />,
  document.getElementById('root')
)

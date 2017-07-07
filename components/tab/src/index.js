import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import tabs from './reducers'

require('./styles/style.global.css');

const store = createStore(
  tabs,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 加上该参数可以看到Redux插件中的store变化
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

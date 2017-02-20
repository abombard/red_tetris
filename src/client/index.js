import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './containers/Game'
import { squareClicked } from './actions/squareClicked'

const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger())
)

const socket = io()
socket.on('action', (action) => {
  if (action.type === 'play') {
    console.log('other player playing')
    store.dispatch(squareClicked(action.msg))
  }
})

ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('tetris'))

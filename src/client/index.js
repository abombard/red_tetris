import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './containers/Game'

const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger())
)

ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('tetris'))


const RIGHT = 37
const LEFT = 39
const UP = 38
const DOWN = 40
const SPACE = 32

//const socket = io()
const handleKey = (ev) => {
  switch (ev.keyCode) {
  case RIGHT:
  case LEFT:
  case UP:
  case DOWN:
  case SPACE:
    console.log(`key ${ev.keyCode}`)
    //socket.emit('action', { type: 'KEY_PRESS', payload: ev.keyCode })
  default:
    break ;
  }
}

window.addEventListener('keydown', handleKey, false)

/*
import { GET_MAP, getMap } from './actions/getMap'

const socket = io();
socket.on('action', (action) => {
  switch (action.type) {
  case GET_MAP:
    store.dispatch(getMap(action.payload))
    break ;
  default:
    console.log(`Unexpected action ${action.type}`)
    break ;
  }
})
*/

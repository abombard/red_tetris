import React from 'react'
import ReactDom from 'react-dom'
import { Route, IndexRoute } from 'react-router'
import { compose, createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { reduxReactRouter, ReduxRouter } from 'redux-router'
import { createHistory } from 'history';
import { reqRefreshRooms } from './actions'
import tetrisMiddleware, { listen } from './middleware/redTetrisMiddleware'
import reducer from './reducers'
import inputHandler from './inputHandler'

import App from './components/App'
import Lobby from './components/Lobby'
import Room from './components/Room'

const socket = io()

const store = compose(
  applyMiddleware(tetrisMiddleware(socket), createLogger()),
  reduxReactRouter({ createHistory })
)(createStore)(reducer)

listen(store, socket)

window.addEventListener('keydown', inputHandler(socket), false)

const onEnterLobby = () => {
  store.dispatch(reqRefreshRooms())
}

const onEnterRoom = () => {
  socket.emit('room', {
    type: 'JOIN_ROOM',
    name: store.getState().router.params.playerName,
  })
}

const onLeaveRoom = () => {
  socket.emit('room', {
    type: 'LEAVE_ROOM',
  })
}

ReactDom.render((
  <Provider store={store}>
    <ReduxRouter>
      <Route component={App} path='/'>
        <IndexRoute component={Lobby} onEnter={onEnterLobby} />
        <Route component={Room} onEnter={onEnterRoom} onLeave={onLeaveRoom} path='/:roomName[:playerName]' />
      </Route>
    </ReduxRouter>
  </Provider>
), document.getElementById('tetris'))

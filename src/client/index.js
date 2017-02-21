import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './components/App'
import Lobby from './components/Lobby'
import Room from './components/Room'
import tetrisMiddleware, { listen } from './middleware/redTetrisMiddleware'
import { Route, IndexRoute } from 'react-router'
import { reduxReactRouter, ReduxRouter } from 'redux-router'
import { createHistory } from 'history';
import { reqRefreshRooms } from './actions'

const socket = io('192.168.1.15:3004')

const store = compose(
  applyMiddleware(tetrisMiddleware(socket), createLogger()),
  reduxReactRouter({ createHistory })
)(createStore)(reducer)

listen(store, socket)

const onEnterLobby = () => {
  store.dispatch(reqRefreshRooms())
}

ReactDom.render((
  <Provider store={store}>
    <ReduxRouter>
      <Route component={App} path='/'>
        <IndexRoute component={Lobby} onEnter={onEnterLobby} />
        <Route component={Room} path='/:roomName/:playerName' />
      </Route>
    </ReduxRouter>
  </Provider>
), document.getElementById('tetris'))

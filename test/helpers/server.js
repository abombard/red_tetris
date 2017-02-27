import * as server from '../../src/server/index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export const startServer = (params, cb) => {
  server.create(params)
    .then( server => cb(null, server) )
    .catch( err => cb(err) )
}

export const configureStore = (reducer, socket, initialState, types) => createStore( 
  reducer, 
  initialState, 
  applyMiddleware(
    myMiddleware(types), 
    socketIoMiddleWare(socket),  
    thunk
  )
)

const isFunction = arg => { return typeof arg === 'function' }

const myMiddleware = (types={}) => {
  const fired = {}
  return store => next => action => {
    const result = next(action)
    const cb = types[action.type]
    if(cb && !fired[action.type]){
      if(!isFunction(cb)) throw new Error("action's type value must be a function")
      fired[action.type] = true
      cb({getState: store.getState, dispatch: store.dispatch, action})
    }
    return result
  }
}
/*
const socketIoMiddleWare = socket => ({dispatch, getState}) => {
  if(socket) socket.on('action', dispatch)
  return next => action => {
    if(socket && action.type) socket.emit('action', action)
    return next(action)
  }
  if(socket) socket.on('room', dispatch)
  return next => action => {
    if(socket && action.type) socket.emit('room', action)
    return next(action)
  }
  if(socket) socket.on('lobby', dispatch)
  return next => action => {
    if(socket && action.type) socket.emit('lobby', action)
    return next(action)
  }
}*/
const socketIoMiddleWare = socket => ({dispatch, getState}) => {
  if(socket)
  {
    socket.on('lobby', dispatch)
    socket.on('room', dispatch)
    socket.on('action', dispatch)
    socket.on('game', dispatch)
  }
  return next => action => {
    if(socket && action.type) {
      socket.emit('lobby', action)
      socket.emit('game', action)
      socket.emit('room', action)
      socket.emit('action', action)
    }
    return next(action)
  }
}

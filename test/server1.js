import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import {reqRefreshRooms, refreshRooms, updateCreateRoomName, reqCreateRoom} from '../src/client/actions/index'
import io from 'socket.io-client'
import params from '../params'
import {ROOM_LIST, PAYLOAD} from './redux1'




chai.should()

const nextState = {playerName: "lalal"}

describe('server test', function(){
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))
    const socket = io(params.server.url)
    const socket2 = io(params.server.url)
  after(function(done){tetrisServer.stop(done)})

  it('should delete rooms', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, socket, initialState, {
      'REQ_REFRESH_ROOMS': () =>  done()
    })
    store.dispatch(reqRefreshRooms())
  });
  it('should create a room', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, socket, initialState, {
      'RESP_CREATE_ROOM': () =>  done()
    })
    store.dispatch(reqCreateRoom())
  });
  it('should join a room', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, socket, initialState, {
      'PLAYER_JOIN': () =>  done()
    })
    store.dispatch({
      type: 'JOIN_ROOM',
      roomName: 'randomroomname'
    })
  });
  it('should get room list', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, socket, initialState, {
      'REFRESH_ROOMS': () =>  done()
    })
    store.dispatch(refreshRooms(ROOM_LIST))
  });

  it('should join a room', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, socket2, initialState, {
      'PLAYER_JOIN': () =>  done()
    })
    store.dispatch({
      type: 'JOIN_ROOM',
      roomName: 'randomroomname'
    })
  });
  for (let i = 0; i < 15; i++)
  {
    it('should play', function(done){
      const initialState = {}
      const store =  configureStore(rootReducer, socket, initialState, {
        'KEY_PRESS_OK': () =>  done()
      })
      store.dispatch({
        type: 'KEY_PRESS',
        payload: 37
      })
    });
  }
  for (let i = 0; i < 15; i++)
  {
    it('should play', function(done){
      const initialState = {}
      const store =  configureStore(rootReducer, socket, initialState, {
        'KEY_PRESS_OK': () =>  done()
      })
      store.dispatch({
        type: 'KEY_PRESS',
        payload: 39
      })
    });
  }
  for (let i = 0; i < 15; i++)
  {
    it('should play', function(done){
      const initialState = {}
      const store =  configureStore(rootReducer, socket, initialState, {
        'KEY_PRESS_OK': () =>  done()
      })
      store.dispatch({
        type: 'KEY_PRESS',
        payload: 32
      })
    });
  }
  for (let i = 0; i < 15; i++)
  {
    it('should play', function(done){
      const initialState = {}
      const store =  configureStore(rootReducer, socket, initialState, {
        'KEY_PRESS_OK': () =>  done()
      })
      store.dispatch({
        type: 'KEY_PRESS',
        payload: 38
      })
    });
  }
  for (let i = 0; i < 100; i++)
  {
    it('should play', function(done){
      const initialState = {}
      const store =  configureStore(rootReducer, socket, initialState, {
        'KEY_PRESS_OK': () =>  done()
      })
      store.dispatch({
        type: 'KEY_PRESS',
        payload: 40
      })
    });
  }
    it('should play', function(done){
      const initialState = {}
      const store =  configureStore(rootReducer, socket, initialState, {
        'KEY_PRESS_OK': () =>  done()
      })
      store.dispatch({
        type: 'KEY_PRESS',
        payload: 13
      })
    });
  for (let i = 0; i < 100; i++)
  {
    it('should play', function(done){
      const initialState = {}
      const store =  configureStore(rootReducer, socket, initialState, {
        'KEY_PRESS_OK': () =>  done()
      })
      store.dispatch({
        type: 'KEY_PRESS',
        payload: 40
      })
    });
  }

  it('should leave a room', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, socket, initialState, {
      'PLAYER_LEAVE': () =>  done()
    })
    store.dispatch({
      type: 'LEAVE_ROOM',
    })
  });
  it('should not join a room', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, socket, initialState, {
      'JOIN_ROOM_FAIL': () =>  done()
    })
    store.dispatch({
      type: 'JOIN_ROOM',
      roomName: ''
    })
  });
});

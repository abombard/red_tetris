import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import {reqRefreshRooms, refreshRooms} from '../src/client/actions/index'
import {getMap} from '../src/client/actions/getMap'
import io from 'socket.io-client'
import params from '../params'
import {ROOM_LIST, GRID} from './redux1'
import {onEnterRoom} from '../src/client/rooms'


chai.should()

const nextState = {playerName: "lalal"}

describe('Fake server test', function(){
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('should delete rooms', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'REQ_REFRESH_ROOMS': () =>  done()
    })
    store.dispatch(reqRefreshRooms())
  });
  it('should get room list', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'REFRESH_ROOMS': () =>  done()
    })
    store.dispatch(refreshRooms(ROOM_LIST))
  });
  it('should get map', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'GET_MAP': () =>  done()
    })
    store.dispatch(getMap(GRID))
  });
  
  it('should DO SMth', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    socket.emit('room', {type:'JOIN_ROOM', name: "lll"})
    done();
  });
});

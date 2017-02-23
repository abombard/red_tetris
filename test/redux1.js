import {configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import {GET_MAP, getMap} from '../src/client/actions/getMap'
import {REQ_REFRESH_ROOMS, REFRESH_ROOMS, reqRefreshRooms, refreshRooms} from '../src/client/actions/index'
import chai from "chai"

const GRID = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ]

const EMPTY_ROOMS = []

const ROOM_LIST = [{name : "kitchen", playerCount: 2},{name : "livingroom", playerCount: 45}]


chai.should()

describe('map transmission', function(){
  it('should get the map', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, null, initialState, {
      GET_MAP: ({dispatch, getState}) =>  {
        const state = getState()
        state.grid.grid.should.equal(GRID)
        done()
      }
    })
    store.dispatch(getMap(GRID))
  });

});



describe('empty room list', function(){
  it('should delete all rooms', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, null, initialState, {
      REQ_REFRESH_ROOMS: ({dispatch, getState}) =>  {
        const state = getState()
        state.lobby.rooms.should.be.empty
        done()
      }
    })
    store.dispatch(reqRefreshRooms(REQ_REFRESH_ROOMS))
  });

});


describe('retrieve room list', function(){
  it('should get the room list from server', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, null, initialState, {
      REFRESH_ROOMS: ({dispatch, getState}) =>  {
        const state = getState()
        state.lobby.rooms.should.equal(ROOM_LIST)
        done()
      }
    })
    store.dispatch(refreshRooms(ROOM_LIST))
  });

});

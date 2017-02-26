const initialState = {
  rooms: [],
  createRoomName: '',
}

const lobby = (state = initialState, action) => {
  switch (action.type) {
  case 'REQ_REFRESH_ROOMS':
    return {
      ...state,
      rooms: [],
    }
  case 'UPDATE_CREATE_ROOM_NAME':
    return {
      ...state,
      createRoomName: action.name,
    }
  case 'REFRESH_ROOMS':
    return {
      ...state,
      rooms: action.rooms,
    }
  default:
    return state
  }
}

export default lobby

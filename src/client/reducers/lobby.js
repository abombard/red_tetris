const initialState = {
  rooms: [],
}

const lobby = (state = initialState, action) => {
  switch (action.type) {
  case 'REQ_REFRESH_ROOMS':
    return {
      ...state,
      rooms: [],
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

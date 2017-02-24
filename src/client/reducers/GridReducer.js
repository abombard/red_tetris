import { GET_MAP } from '../actions/getMap'

const initialState = {
  grid: Array(10).fill(Array(20).fill(0)),
  nextPiece: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_MAP:
    return {
      ...state,
      grid: action.payload.displayGrid,
      nextPiece: action.payload.nextPiece.id
    }
  default:
    return state;
  }
}

export default reducer

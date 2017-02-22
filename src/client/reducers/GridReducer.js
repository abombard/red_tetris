import { GET_MAP } from '../actions/getMap'

const initialState = {
  grid: Array(10).fill(Array(15).fill(0)),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_MAP:
    return {
      ...state,
      grid: action.payload,
    }
  default:
    return state;
  }
}

export default reducer

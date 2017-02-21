import { GET_MAP } from '../actions/getMap'

const initialState = {
  grid: Array(15).fill(Array(10).fill('blank')),
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

import { SQUARE_CLICKED } from '../actions/squareClicked'

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
}

const socket = io('http://0.0.0.0:3004')

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SQUARE_CLICKED:
    if (state.squares[action.id] !== null)
      return state
    socket.emit('action', { type : 'play', msg : action.id}) 
    const squares = state.squares.slice();
    squares[action.id] = state.xIsNext ? 'X' : 'O';
    return {
      ...state,
      squares,
      xIsNext: !state.xIsNext,
    }
  default:
    return state;
  }
}

export default reducer


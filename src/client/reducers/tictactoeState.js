import { SQUARE_CLICKED } from '../actions/squareClicked'
import socket from '../index'

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SQUARE_CLICKED:
      if (state.squares[action.id] !== null)
        return state
    const squares = state.squares.slice();
    squares[action.id] = state.xIsNext ? 'X' : 'O';
    console.log('emitting')
          socket.emit('action', { type : 'play', msg : action.id}) 
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


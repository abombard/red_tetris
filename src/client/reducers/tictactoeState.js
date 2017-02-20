import { SQUARE_CLICKED } from '../actions/squareClicked'

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SQUARE_CLICKED:
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


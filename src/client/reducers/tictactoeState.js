import { SQUARE_CLICKED } from '../actions/squareClicked'

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true
}

const reducer = (state = initialState , action) => {
  switch(action.type){
    case SQUARE_CLICKED:
      let squares = state.squares.splice();
      squares[action.id] = state.xIsNext ? 'X' : 'O';
      state = {
        ...state,
        squares: squares,
        xIsNext: !state.xIsNext
      }
    default:
      return state;
  }
}

export default reducer


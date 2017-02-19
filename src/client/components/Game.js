import React from 'react'
import { connect } from 'react-redux'
import Board from './Board'
import { squareClicked } from '../actions/squareClicked'
import './TicTacToe.css'

const Game = ({ squares, onSquareClick }) => (
  <div>
    <Board squares={squares} onSquareClick={onSquareClick} />
  </div>
)

const mapStateToProps = (state) => {
  return {
    squares: state.squares,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSquareClick: (id) => {
	  dispatch(squareClicked(id))
	}
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default App

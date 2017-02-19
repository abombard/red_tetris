import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Board from '../components/Board'
import Square from '../components/Square'
import { squareClicked } from '../actions/squareClicked'
import './TicTacToe.css'

const Game = ({ squares, onSquareClick }) => (
  <div>
    <Board onSquareClick={onSquareClick} squares={squares} />
  </div>
)

Game.propTypes = {
  onSquareClick: PropTypes.func.isRequired,
  squares: PropTypes.arrayOf(PropTypes.instanceOf(Square)).isRequired,
}

const mapStateToProps = (state) => ({
  squares: state.squares,
})

const mapDispatchToProps = (dispatch) => ({
  onSquareClick: (id) => {
    dispatch(squareClicked(id))
  },
})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default App

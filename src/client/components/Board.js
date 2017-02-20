import React, { PropTypes } from 'react'
import Square from './Square'

const Board = ({ squares, onSquareClick }) => (
  <div>
    <div className='board-row'>
      <Square onClick={() => onSquareClick(0)} value={squares[0]} />
      <Square onClick={() => onSquareClick(1)} value={squares[1]} />
      <Square onClick={() => onSquareClick(2)} value={squares[2]} />
    </div>
    <div className='board-row'>
      <Square onClick={() => onSquareClick(3)} value={squares[3]} />
      <Square onClick={() => onSquareClick(4)} value={squares[4]} />
      <Square onClick={() => onSquareClick(5)} value={squares[5]} />
    </div>
    <div className='board-row'>
      <Square onClick={() => onSquareClick(6)} value={squares[6]} />
      <Square onClick={() => onSquareClick(7)} value={squares[7]} />
      <Square onClick={() => onSquareClick(8)} value={squares[8]} />
    </div>
  </div>
)

Board.propTypes = {
  onSquareClick: PropTypes.func.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Board

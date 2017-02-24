import React, { PropTypes } from 'react'

import Grid from '../components/Grid'
<<<<<<< HEAD
import NextPiece from '../components/NextPiece'
import './Game.css'
=======
>>>>>>> master

const Game = ({ grid, nextPiece }) => (
  <div className='game'>
    <Grid grid={grid} />
    <NextPiece nextPiece={nextPiece} />
  </div>
)

Game.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  nextPiece: PropTypes.number.isRequired
}

export default Game

import React, { PropTypes } from 'react'

import Grid from '../components/Grid'
import './Game.css'

const Game = ({ grid }) => (
  <div className='body'>
    <Grid grid={grid} />
  </div>
)

Game.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
}

export default Game

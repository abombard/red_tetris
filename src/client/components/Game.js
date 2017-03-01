import React, { PropTypes } from 'react'
import Grid from '../components/Grid'
import NextPiece from '../components/NextPiece'
import Shadow from '../components/Shadow'
import './Game.css'
const Game = ({ grid, nextPiece, shadow, win }) => {
  if (win == 1)
  {
    return (
      <div className='victoryMsg'>YOU WIN ! Press Enter to restart</div>
    )
  }
  else if (win == -1)
  {
    return (
      <div className='victoryMsg'>YOU LOST ! Press Enter to restart</div>
    )
  }
  else if (win == -2)
  {
    return (
      <div className='victoryMsg'>Game not finished, please wait</div>
    )
  }
  else {
    return (
      <div className='game'>
        <Grid grid={grid} />
        <div className='infoContainer'>
          <div className='nextPieceContainer'>
            <NextPiece nextPiece={nextPiece} />
          </div>
          <div className='shadowContainer'>
            <Shadow shadow={shadow} />
          </div>
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  nextPiece: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  shadow: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  win: PropTypes.number.isRequired
}

export default Game

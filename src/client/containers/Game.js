import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

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

const mapStateToProps = (state) => ({
  grid: state.grid,
})

const mapDispatchToProps = () => ({

})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default App

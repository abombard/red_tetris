import { connect } from 'react-redux'
import Game from '../components/Game'

const mapStateToProps = (state) => ({
  grid: state.grid.grid,
  nextPiece: state.grid.nextPiece,
  shadow: state.grid.shadow,
  win: state.grid.win
})

const mapDispatchToProps = () => ({

})

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default GameContainer

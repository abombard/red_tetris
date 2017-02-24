import { connect } from 'react-redux'
import Game from '../components/Game'

const mapStateToProps = (state) => ({
  grid: state.grid.grid,
  nextPiece: state.grid.nextPiece
})

const mapDispatchToProps = () => ({

})

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default GameContainer

import { connect } from 'react-redux'
import Welcome from '../components/Welcome'

const mapStateToProps = (state) => ({
  playerName: state.router.params.playerName,
  roomName: state.router.params.roomName,
})

const TetrisContainer = connect(
  mapStateToProps,
)(Welcome)

export default TetrisContainer

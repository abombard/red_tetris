import { connect } from 'react-redux'
import { push } from 'redux-router'
import { reqRefreshRooms } from '../actions'
import RoomList from '../components/RoomList'

const mapStateToProps = (state) => ({
  rooms: state.lobby.rooms,
})

const mapDispatchToProps = (dispatch) => ({
  onRefreshClick: () => {
    dispatch(reqRefreshRooms())
  },
  onRoomClick: (roomName, playerName) => {
    dispatch(push({ pathname: `/${roomName}/${playerName}` }))
  },
})

const RoomListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList)

export default RoomListContainer

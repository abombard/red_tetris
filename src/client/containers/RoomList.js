import { connect } from 'react-redux'
import { push } from 'redux-router'
import { reqRefreshRooms, reqCreateRoom, updateCreateRoomName } from '../actions'
import RoomList from '../components/RoomList'

const mapStateToProps = (state) => ({
  rooms: state.lobby.rooms,
  createName: state.lobby.createRoomName,
})

const mapDispatchToProps = (dispatch) => ({
  onRefreshClick: () => {
    dispatch(reqRefreshRooms())
  },
  onCreateRoomChange: (name) => {
    dispatch(updateCreateRoomName(name))
  },
  onCreateClick: (roomName) => {
    dispatch(reqCreateRoom())
  },
  onRoomClick: (roomName, playerName) => {
    dispatch(push({ pathname: `/${roomName}[${playerName}]` }))
  },
})

const RoomListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList)

export default RoomListContainer

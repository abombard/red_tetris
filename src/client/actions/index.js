export const reqRefreshRooms = () => {
  return {
    type: 'REQ_REFRESH_ROOMS'
  }
}

export const updateCreateRoomName = (name) => {
  return {
    type: 'UPDATE_CREATE_ROOM_NAME',
    name: name
  }
}

export const reqCreateRoom = () => {
  return {
    type: 'REQ_CREATE_ROOM',
  }
}

export const refreshRooms = (rooms) => {
  return {
    type: 'REFRESH_ROOMS',
    rooms
  }
}

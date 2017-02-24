export const reqRefreshRooms = () => {
  return {
    type: 'REQ_REFRESH_ROOMS'
  }
}

export const refreshRooms = (rooms) => {
  return {
    type: 'REFRESH_ROOMS',
    rooms
  }
}

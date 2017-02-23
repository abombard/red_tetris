export const REQ_REFRESH_ROOMS = 'REQ_REFRESH_ROOMS'
export const REFRESH_ROOMS = 'REFRESH_ROOMS'

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

const RIGHT = 37
const LEFT = 39
const UP = 38
const DOWN = 40
const SPACE = 32

const inputHandler = (socket) => (
  (ev) => {
    switch (ev.keyCode) {
      case RIGHT:
      case LEFT:
      case UP:
      case DOWN:
      case SPACE:
        console.log(`key ${ev.keyCode}`)
        socket.emit('action', { type: 'KEY_PRESS', payload: ev.keyCode })
      default:
        break
    }
  }
)

export default inputHandler

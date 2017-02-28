const RIGHT = 37
const LEFT = 39
const UP = 38
const DOWN = 40
const SPACE = 32
const ENTER = 13

const inputHandler = (socket) => (
  (ev) => {
    switch (ev.keyCode) {
      case RIGHT:
      case LEFT:
      case UP:
      case DOWN:
      case SPACE:
      case ENTER:
        ev.preventDefault()
        console.log(`key ${ev.keyCode}`)
        socket.emit('game', {
          type: 'KEY_PRESS',
          payload: ev.keyCode
        })
      default:
        break
    }
  }
)

export default inputHandler

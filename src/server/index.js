import fs  from 'fs'
import debug from 'debug'
import * as game from './game'

const logerror = debug('tetris:error')
const loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const { host, port } = params

  app.on('request', (req, res) => {
    const file = req.url === '/bundle.js' ?
        '/../../build/bundle.js' :
        '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  })

  app.listen({ host, port }, () => {
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const handleGame = (io) => {
  io.on('connection', (socket) => {
    loginfo(`Socket connected: ${socket.id}`)
    socket.on('action', (action) => {
      if (action.type === 'play') {
        console.log('action play')
        io.emit('action', { type: 'play', msg: action.msg })
      }
    })
  })
}

const http = require('http')
const Promise = require('promise')

export const create = (params) => {

  const promise = new Promise((resolve, reject) => {
    const app = http.createServer()
    initApp(app, params, () => {
      const io = require('socket.io')(app)
      const stop = (cb) => {
        io.close()
        app.close(() => {
          app.unref()
        })
        loginfo('Engine stopped.')
        cb()
      }

      game.handle(io)
      resolve({ stop })
    })
  })
  return promise
}

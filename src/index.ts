import app from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'
import socketApp from './controllers/socketApp.controller'

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

const sockets = new Map()
io.on('connection', (socket) => socketApp(socket, io, sockets))

httpServer.listen(app.get('port'))

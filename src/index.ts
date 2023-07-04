import app from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'

import getUserChats from './controllers/ChatControllers/getUserChats.controller'

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

const userChat = io.of('/api/usuario/chats')

userChat.on('connection', getUserChats)

httpServer.listen(app.get('port'))

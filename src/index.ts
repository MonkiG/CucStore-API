import app from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})
const PORT = app.get('port')
const chatNamespace = io.of('/api/chat')

chatNamespace.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chat message', (msg: any) => {
    chatNamespace.emit('chat message', msg)
  })
})
io.on('disconnect', () => {
  console.log('a user disconnected')
  // Realizar acciones al desconectar un usuario
})

httpServer.listen(PORT, () => {
  console.log('Server iniciado')
})

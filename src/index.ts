import app from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'
import * as dotenv from 'dotenv'

// import { getChatsByUserId } from './controllers/messagesControllers/getChatsByUserId'
dotenv.config()

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})
const PORT = app.get('port')

const mensajesRoom = io.of('/api/mensajes')

mensajesRoom.on('connection', (socket) => {
  socket.on('userToken', (_data) => {
    // storedData = data
  })

  socket.emit('mensajes', 'data')
})

io.on('disconnect', () => {
  console.log('a user disconnected')
  // Realizar acciones al desconectar un usuario
})

httpServer.listen(PORT, () => {
  console.log('Server iniciado')
})

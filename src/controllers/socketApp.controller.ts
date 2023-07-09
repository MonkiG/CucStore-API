import { Socket } from 'socket.io'
import { Chat } from './../models/TChat.model'
import * as BD from './../helpers/bdActions'

export default async function socketApp (socket: Socket, io: any, mapSockets: Map<string, string>): Promise<void> {
  console.log('[APP] socket connected')

  const user = socket.handshake.headers.user as string
  mapSockets.set(user, socket.id)

  socket.on('disconnect', () => {
    console.log('[APP] socket disconnected')
    mapSockets.delete(user)
  })

  /* TODO:
    Actualizar chats en tiempo real
  */
  socket.on('getUserChats', async () => {
    await BD.connectBD()
    const chats = await Chat.find({ participantes: user }).populate({ path: 'participantes', select: 'imgUrl nombreMarca nombreCompleto chats' }).exec()
    console.log('[CHATS] user show')

    if (chats.length > 0) {
      socket.emit('chatRooms', chats)
      return
    }

    socket.emit('chatRooms', null)
  })

  socket.on('joinRoom', async (roomData) => {
    /* TODO:
        Validar si el usuario no se encuentra ya en ese room
    */
    const fromMapSocketId = mapSockets.get(roomData.from)
    const toMapSocketId = mapSockets.get(roomData.to)
    const room = `chatRoom:${roomData.id as string}`
    const fromSocket = io.sockets.sockets.get(fromMapSocketId)
    const toSocket = io.sockets.sockets.get(toMapSocketId)

    if (toSocket === undefined) {
      console.log('Usuario no conectado')
      return
    }

    await fromSocket.join(room)
    await toSocket.join(room)

    console.log(`
        Miembros del room: ${Array.from(io.sockets.adapter.rooms.get(room)).join(', ')}
        fromId: ${fromSocket.id as string}
        toId: ${toSocket.id as string}
    `)
  })

  socket.on('message', (room, message) => {
    if (user !== null) {
      console.log(`[CHAT] socket message ${message as string} in room # ${room as string} to:`)
    }
  })
}

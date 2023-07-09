import { Socket } from 'socket.io'
import { Chat } from './../models/TChat.model'
import * as BD from './../helpers/bdActions'

export default function socketApp (socket: Socket, io: any, socketsMap: Map<string, string>): void {
  console.log('[APP] socket connected')

  // Obtiene el id del usuario desde los headers y lo almacena junto con el socketId en un map
  const user = socket.handshake.headers.user as string
  socketsMap.set(user, socket.id)

  socket.on('disconnect', () => {
    console.log('[APP] socket disconnected')
    socketsMap.delete(user)
  })

  socket.on('getUserChats', async () => {
    /* TODO:
      Actualizar chats en tiempo real
    */
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
    console.log('[JoinRoom] socket event')
    /* TODO:
        Validar si el usuario no se encuentra ya en ese room
    */
    // Obtiene el socket id almacenado en el map usando el id del usuario
    const fromMapSocketId = socketsMap.get(roomData.from)
    const toMapSocketId = socketsMap.get(roomData.to)

    const room = `chatRoom:${roomData.id as string}`
    // Obtiene el socket de cada usuario
    const fromSocket = io.sockets.sockets.get(fromMapSocketId)
    const toSocket = io.sockets.sockets.get(toMapSocketId)

    if (toSocket === undefined) {
      console.log('Usuario no conectado')
      return
    }

    // Une a los dos usuarios a una misma sala
    await fromSocket.join(room)
    await toSocket.join(room)

    console.log(`
        Miembros del room: ${Array.from(io.sockets.adapter.rooms.get(room)).join(', ')}
        fromId: ${fromSocket.id as string}
        toId: ${toSocket.id as string}
    `)
  })

  socket.on('getMessages', (room) => {
    console.log('[Messages] socket event')

    const hardcodedChat: any = [
      {
        _id: 'asdfasdfasdfasdfasdf',
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: room.from,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
      {
        _id: 'qweqweqweqwe',
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: room.from,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
      {
        _id: '523423423423',
        text: 'How are you',
        createdAt: new Date(),
        user: {
          _id: room.to,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
      {
        _id: 'asdfasdfew',
        text: 'Long time I don\'t see you',
        createdAt: new Date(),
        user: {
          _id: room.to,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
      {
        _id: 'asdfasdfewasdfasdf',
        text: 'I know, hahaha',
        createdAt: new Date(),
        user: {
          _id: room.from,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
      {
        _id: 'asdfasdfe43534534wasdfasdf',
        text: 'let\'s see some day',
        createdAt: new Date(),
        user: {
          _id: room.to,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      }
    ]
    socket.on('message', (message) => {
      const parseredMessage = {
        _id: message[0]._id,
        text: message[0].text,
        createdAt: message[0].createdAt,
        user: {
          _id: message[0].user._id,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      }
      io.to(`chatRoom:${room.id as string}`).emit('message', parseredMessage)
    })

    io.to(`chatRoom:${room.id as string}`).emit('messages', hardcodedChat.reverse())

    // if (user !== null) {
    //   console.log(`[CHAT] socket message ${message as string} in room # ${room as string} to:`)
    //   io.to(room.id).emit('messages', hardcodedChat)
    //   io.to(room.id).on('message', (message: any) => {
    //     console.log(message)
    //   })
    // }
  })
}

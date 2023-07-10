import { Socket } from 'socket.io'
import { Chat } from './../models/TChat.model'
import * as BD from './../helpers/bdActions'
// import { toMessage } from './../helpers/utils'
// import { Mensaje } from './../models/TMensajes.model'

export default function socketApp (socket: Socket, io: any, socketsMap: Map<string, string>): void {
  console.log('[APP] socket connected')

  // Obtiene el id del usuario desde los headers y lo almacena junto con el socketId en un map
  const user = socket.handshake.headers.user as string
  socketsMap.set(user, socket.id)

  socket.on('disconnect', async () => {
    console.log('[APP] socket disconnected')
    socketsMap.delete(user)
    await BD.disconnectBD()
  })

  socket.on('createUserChat', async ({ usuario, to }) => {
    /* TODO:
      Manejar caso en el que el chat si exista
    */
    console.log('[CHATS] create chatRoom')
    await BD.connectBD()
    const chat = await Chat.findOne({ participantes: { $all: [usuario, to] } }).populate({ path: 'participantes', select: '_id nombreCompleto createdAt imgUrl chats' }).exec()
    if (chat === null) {
      await new Chat({ participantes: [usuario, to] }).save()
      const [populatedChat] = await Chat.find({ participantes: [usuario, to] }).populate({ path: 'participantes', select: '_id nombreCompleto createdAt imgUrl chats' }).exec()
      const roomId = JSON.stringify(populatedChat._id)

      await joinRoom({ io, roomId, from: usuario, to, socketsMap })
      io.to(`chatRoom:${roomId}`).emit('newChat', populatedChat)
    } else {
      const roomId = JSON.stringify(chat._id)
      await joinRoom({ io, roomId, from: usuario, to, socketsMap })
    }
  })

  socket.on('getUserChats', async () => {
    console.log('[CHATS] user show')
    await BD.connectBD()
    const chats = await Chat.find({ participantes: user }).populate({ path: 'participantes', select: 'imgUrl nombreMarca nombreCompleto chats _id' }).exec()

    if (chats.length > 0) {
      socket.emit('chatRooms', chats)
      return
    }

    socket.emit('chatRooms', null)
  })

  // socket.on('getMessages', (room) => {
  //   console.log('[Messages] socket event')

  //   io.to(`chatRoom:${room.id as string}`).emit('messages', hardcodedChat.reverse())
  // })
  // socket.on('message', async (messageData) => {
  //   const parseredMessage = toMessage(messageData)
  //   await new Mensaje(parseredMessage).save()
  //   const message = await Mensaje.findOne({ user }).populate({ path: 'user', select: 'ImgUrl nombreCompleto _id' }).exec()

  //   io.to(`chatRoom:${room.id as string}`).emit('message', message)
  // })
}

const joinRoom = async ({ io, roomId, from, to, socketsMap }: any): Promise<void> => {
  /* TODO:
    Manejar caso en el que un usuario no este conectado
  */

  // Obtiene el socket id almacenado en el map usando el id del usuario
  const room = `chatRoom:${roomId as string}`

  // Si no existe el room, va a crearlo y a unir a los usuarios
  if (io.sockets.adapter.rooms.has(room) === false) {
    const fromMapSocketId = socketsMap.get(from)
    const toMapSocketId = socketsMap.get(to)

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
  }
}

/*
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
*/

import * as BD from './../../helpers/bdActions'
import { Chat } from './../../models/TChat.model'
import * as dotenv from 'dotenv'
import { Socket } from 'socket.io'
dotenv.config()

export default async function getUserChats (socket: Socket, user: any): Promise<void> {
  await BD.connectBD()
  const chats = await Chat.find({ participantes: user }).populate({ path: 'participantes', select: 'imgUrl nombreMarca nombreCompleto chats' }).exec()
  console.log('[CHATS] user show')

  if (chats.length > 0) {
    socket.emit('chatRooms', chats)
    return
  }

  socket.emit('chatRooms', null)
}

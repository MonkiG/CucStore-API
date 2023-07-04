import jwt from 'jsonwebtoken'
import { TokenData } from './../../types'
import * as BD from './../../helpers/bdActions'
import { Chat } from './../../models/TChat.model'
import * as dotenv from 'dotenv'
import { Socket } from 'socket.io'
dotenv.config()

export default function getUserChats (socket: Socket): void {
  const userToken = socket.handshake.headers.authorization
  const user = jwt.verify(userToken as string, process.env.JWT_SECRET as string) as TokenData
  (async (): Promise<void> => {
    await BD.connectBD()
    const chats = await Chat.find({ participantes: user.id })
    await BD.disconnectBD()

    if (chats.length > 0) {
      console.log('Here')

      socket.emit('chatRooms', chats)
      return
    }

    console.log('NO cuenta con chats')

    socket.emit('chatRooms', hardcodedChats)
  })().catch(e => console.error(e))
}

const hardcodedChats = [{
  id: '1',
  userName: 'Jenny Doe',
  userImg: 'Some url',
  messageTime: '4 mins ago',
  messageText:
        'Hey there, this is my test for a post of my social app in React Native.'
},
{
  id: '2',
  userName: 'John Doe',
  userImg: 'Some url',
  messageTime: '2 hours ago',
  messageText:
        'Hey there, this is my test for a post of my social app in React Native.'
},
{
  id: '3',
  userName: 'Ken William',
  userImg: 'Some url',
  messageTime: '1 hours ago',
  messageText:
        'Hey there, this is my test for a post of my social app in React Native.'
},
{
  id: '4',
  userName: 'Selina Paul',
  userImg: 'Some url',
  messageTime: '1 day ago',
  messageText:
        'Hey there, this is my test for a post of my social app in React Native.'
},
{
  id: '5',
  userName: 'Christy Alex',
  userImg: 'Some url',
  messageTime: '2 days ago',
  messageText:
        'Hey there, this is my test for a post of my social app in React Native.'
},
{
  id: '6',
  userName: 'MonkiDev',
  userImg: 'Some url',
  messageTime: '2 days ago',
  messageText:
          'Hey there, this is my test for a post of my social app in React Native.'
},
{
  id: '7',
  userName: 'Ramón Hernández',
  userImg: 'Some url',
  messageTime: '2 days ago',
  messageText:
            'Hey there, this is my test for a post of my social app in React Native.'
}]

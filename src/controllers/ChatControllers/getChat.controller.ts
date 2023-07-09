import { Socket } from 'socket.io'
// import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
// import { TokenData } from './../../types'
dotenv.config()
export default function getChat (socket: Socket): void {
  const userToken = socket.handshake.headers.authorization
  const userToChatId = socket.handshake.headers.userToChat as string
  //   const remitentUserId = jwt.verify(userToken as string, process.env.JWT_SECRET as string) as TokenData
  const hardcodedChat: any = [
    // {
    //   _id: 'asdfasdfasdfasdfasdf',
    //   text: 'Hello developer',
    //   createdAt: new Date(),
    //   user: {
    //     _id: userToChatId,
    //     name: 'React Native',
    //     avatar: 'https://placeimg.com/140/140/any'
    //   }
    // },
    // {
    //   _id: 'qweqweqweqwe',
    //   text: 'Hello world',
    //   createdAt: new Date(),
    //   user: {
    //     _id: userToken,
    //     name: 'React Native',
    //     avatar: 'https://placeimg.com/140/140/any'
    //   }
    // },
    // {
    //   _id: '523423423423',
    //   text: 'How are you',
    //   createdAt: new Date(),
    //   user: {
    //     _id: userToChatId,
    //     name: 'React Native',
    //     avatar: 'https://placeimg.com/140/140/any'
    //   }
    // },
    // {
    //   _id: 'asdfasdfew',
    //   text: 'Long time I don\'t see you',
    //   createdAt: new Date(),
    //   user: {
    //     _id: userToChatId,
    //     name: 'React Native',
    //     avatar: 'https://placeimg.com/140/140/any'
    //   }
    // },
    // {
    //   _id: 'asdfasdfewasdfasdf',
    //   text: 'I know, hahaha',
    //   createdAt: new Date(),
    //   user: {
    //     _id: userToken,
    //     name: 'React Native',
    //     avatar: 'https://placeimg.com/140/140/any'
    //   }
    // }
  ]

  const handleChatMsgs = (data: any): void => {
    console.log(userToken)
    console.log(data)
    socket.to(userToChatId).emit('receiveMsg', data)
  }

  (async (): Promise<void> => {
    socket.emit('chat', hardcodedChat)
    socket.on('sendMsg', handleChatMsgs)
  })().catch(e => console.error(e))
}

import mongoose from 'mongoose'
import { IChat } from './../types'

const date = Date().toString()
const TChat = new mongoose.Schema<IChat>({
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TUsuario'
  }
  ],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TMensaje'
  }],
  createdAt: { type: String, default: date }
})

TChat.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const Chat = mongoose.model('TChat', TChat)

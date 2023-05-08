import { Document } from 'mongoose'
import { Mensaje } from './../../models/TChat.model'

export async function getChatsByUserId (userId: string): Promise<Document[]> {
  try {
    const chats = await Mensaje.find({ 'users.user': userId })
      .exec()

    if (chats.length === 0) {
      throw new Error('No se encontraron chats para el usuario')
    }
    return chats
  } catch (error) {
    throw new Error()
  }
}

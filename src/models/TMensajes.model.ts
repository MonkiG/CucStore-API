import mongoose from 'mongoose'
import { IMensaje } from './../types'

const TMensaje = new mongoose.Schema<IMensaje>({
  texto: { type: String, required: false },
  user: { type: mongoose.Schema.Types.ObjectId }
},
{
  timestamps: true
})

TMensaje.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const Mensaje = mongoose.model('TMensaje', TMensaje)

import mongoose from 'mongoose'
import { IUsuario } from './../types'

const TUsuarioSchema = new mongoose.Schema<IUsuario>({
  nombreCompleto: { type: String, required: true },
  nombreMarca: String,
  correo: { type: String, required: true },
  contraseña: { type: String, required: true },
  imgUrl: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TProducto', default: null }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TChat', default: null }],
  telefonos: { type: String, default: null },
  isActive: { type: Boolean, default: true }
})

TUsuarioSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const Usuario = mongoose.model('TUsuario', TUsuarioSchema)

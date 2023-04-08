import mongoose from 'mongoose'
import { IUsuario } from '../types'

const TUsuarioSchema = new mongoose.Schema<IUsuario>({
  nombres: { type: String, required: true },
  apellidoPaterno: { type: String, required: true },
  apellidoMaterno: { type: String, required: true },
  nombreMarca: String,
  correo: { type: String, required: true },
  contraseña: { type: String, required: true },
  imgUrl: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TProducto', default: null }],
  telefonos: [{ type: String, default: null }]
})

export const Usuario = mongoose.model('TUsuario', TUsuarioSchema)

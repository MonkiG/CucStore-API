import mongoose from 'mongoose'
import { IProducto } from './../types'

const TProductosSchema = new mongoose.Schema<IProducto>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  puntaje: { type: Number, default: null },
  imgUrl: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'TUsuario', required: true },
  categoria: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TCategoria', required: true }]
})

TProductosSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Producto = mongoose.model('TProducto', TProductosSchema)

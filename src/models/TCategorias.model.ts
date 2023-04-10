import mongoose from 'mongoose'
import { categoria } from './../types'

const TCategoriasSchema = new mongoose.Schema<categoria>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  producto: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TProducto' }]
})

TCategoriasSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Categoria = mongoose.model('TCategoria', TCategoriasSchema)

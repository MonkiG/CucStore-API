import mongoose from 'mongoose'
import { categoria } from '../types'

const TCategoriasSchema = new mongoose.Schema<categoria>({

})

TCategoriasSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Categoria = mongoose.model('TCategoria', TCategoriasSchema)

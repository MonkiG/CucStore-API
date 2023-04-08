import mongoose from 'mongoose'

const TProductosSchema = new mongoose.Schema({

})

TProductosSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const Producto = mongoose.model('TProducto', TProductosSchema)

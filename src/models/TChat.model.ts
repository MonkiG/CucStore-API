import mongoose from 'mongoose'

const TMessageSchema = new mongoose.Schema({
  message: {
    text: { type: String, required: true }
    // you can add any other properties to the message here.
    // for example, the message can be an image ! so you need to tweak this a little
  },
  users: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  }],
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  read: { type: Date }
},
{
  timestamps: true
})

TMessageSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const Usuario = mongoose.model('TMensaje', TMessageSchema)

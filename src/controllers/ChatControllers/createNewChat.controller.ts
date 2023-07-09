import { Request, Response } from 'express'
import * as BD from '../../helpers/bdActions'
import { Chat } from './../../models/TChat.model'
export default function createNewChat (req: Request, res: Response): void {
  const { usuario, to } = req.body

  if (to === null || to === undefined) {
    res.status(400).json({ message: 'Ingrese id del usuario receptor' })
    return
  }
  (async () => {
    await BD.connectBD()
    const chat = await Chat.findOne({ participantes: { $all: [usuario, to] } })
    if (chat === null) {
      const newChat = new Chat({ participantes: [usuario, to] })
      const chatSaved = await newChat.save()
      res.status(201).send(chatSaved)
      return
    }
    res.status(200).send(chat)

    await BD.disconnectBD()
  })().catch(e => res.status(500).json({ message: 'Error en el servidor', e }))
}

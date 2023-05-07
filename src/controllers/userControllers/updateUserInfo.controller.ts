import { Request, Response } from 'express'
import * as BD from './../../helpers/bdActions'
import { Usuario } from './../../models/TUsuarios.model'
export default function updateUserInfo (req: Request, res: Response): void {
  const dataToUpdate = req.body
  const { correo, contraseña, ...rest } = dataToUpdate;

  (async () => {
    try {
      await BD.connectBD()
      const userInfo = await Usuario.findById({ _id: dataToUpdate.usuario })
      rest.correo = userInfo?.correo
      rest.contraseña = userInfo?.contraseña

      const userInfoUpdated = await Usuario.findOneAndUpdate(
        { _id: dataToUpdate.usuario },
        { $set: rest },
        { new: true, select: '-contraseña -productos' }
      )
      if (userInfoUpdated === null) {
        res.status(404).json({ mensaje: 'Usuario no encontrado' })
        return
      }
      res.status(200).send(userInfoUpdated)
    } catch (err) {
      res.status(500).json(err)
    }
  })().catch(e => console.error(e))
}

import * as BD from './../../helpers/bdActions'
import { Request, Response } from 'express'
import { Usuario } from './../../models/TUsuarios.model'
export default function getUserInfo (req: Request, res: Response): void {
  const { usuario } = req.body;
  (async () => {
    try {
      await BD.connectBD()
      const userInfo = await Usuario.find({ _id: usuario }).select('-contraseña')
      await BD.disconnectBD()
      if (userInfo.length > 0) {
        res.status(200).json(userInfo)
        return
      }
      res.status(404).json({ mensaje: 'No hay información para mostrar' })
    } catch (e) {
      res.status(500).json({ mensaje: 'Error en el servidor', e })
    }
  })().catch(e => console.error(e))
}

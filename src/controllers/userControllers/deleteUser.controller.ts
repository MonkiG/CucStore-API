import { Request, Response } from 'express'
import * as BD from './../../helpers/bdActions'
import { Usuario } from './../../models/TUsuarios.model'

export default function deleteUser (req: Request, res: Response): void {
  const { usuario, confirmDelete } = req.body;
  (async () => {
    if (confirmDelete === true) {
      try {
        await BD.connectBD()
        const userDeleted = await Usuario.findOneAndDelete({ _id: usuario })
        await BD.disconnectBD()
        if (userDeleted !== null) {
          res.status(204).json({ mensaje: 'Usuario eliminado con exito' })
          return
        }
      } catch (e) {
        res.status(500).json({ mensaje: 'Error en el servidor' })
      }
    } else {
      res.status(400).json({ mensaje: 'Eliminación no confirmada por el usuario' })
    }
  })().catch(e => console.error(e))
}

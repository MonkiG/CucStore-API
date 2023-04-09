import { Request, Response } from 'express'

import * as BD from './../../helpers/bdActions'
import { Usuario } from '../../models/TUsuarios.model'
export function getAllProducts (_req: Request, res: Response): void {
  (async () => {
    try {
      await BD.connectBD()
      const productos = await Usuario.find({}, '-correo -contraseña -telefonos -createdAt')
        .populate({
          path: 'productos',
          select: '-usuario',
          populate: {
            path: 'categoria',
            select: 'nombre descripcion '
          }
        }).exec()

      await BD.disconnectBD()

      if (productos === null) {
        res.status(404).json({ mensaje: 'No hay productos para mostrar' })
        return
      }

      res.status(200).json(productos)
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
  })().catch(error => res.status(500).json({ mensaje: 'Error en el servidor', error }))
}

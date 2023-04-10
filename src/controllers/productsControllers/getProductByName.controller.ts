import { Request, Response } from 'express'
import * as BD from './../../helpers/bdActions'

import { Usuario } from './../../models/TUsuarios.model'

export function getProductByName (req: Request, res: Response): void {
  const { nombre } = req.params;

  (async () => {
    try {
      await BD.connectBD()
      const usuarios = await Usuario.find({}, '-correo -contraseña -telefonos -createdAt')
        .populate({
          path: 'productos',
          select: '-usuario',
          populate: {
            path: 'categoria',
            select: 'nombre descripcion'
          },
          match: { nombre }
        }).exec()
      await BD.disconnectBD()

      const productos = usuarios.filter(usuario => typeof usuario.productos !== 'undefined' && usuario.productos.length > 0)

      if (productos.length > 0) {
        res.status(200).json(productos)
        return
      }
      res.status(404).json({ mensaje: 'Producto no encontrado' })
    } catch (e) {
      res.status(500)
    }
  })().catch(e => res.status(500).json({ e }))
}

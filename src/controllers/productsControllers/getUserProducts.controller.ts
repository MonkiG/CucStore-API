import { Request, Response } from 'express'
import { Producto } from './../../models/TProductos.model'
import * as BD from './../../helpers/bdActions'

export function getUserProducts (req: Request, res: Response): void {
  const { usuario } = req.body;

  (async () => {
    try {
      await BD.connectBD()
      const productos = await Producto.find({ usuario }).select('-usuario')
      await BD.disconnectBD()

      if (productos.length > 0) {
        res.status(200).json(productos)
        return
      }
      res.status(204).json({ mensaje: 'El usuario no cuenta con productos' })
    } catch (error) {
      res.status(500)
    }
  })().catch(err => console.error(err))
}

import { Request, Response } from 'express'
import * as BD from './../../helpers/bdActions'
import { Producto } from '../../models/TProductos.model'
export function editUserProductById (req: Request, res: Response): void {
  const dataToUpdate = req.body
  const { productId } = req.params;

  (async () => {
    try {
      await BD.connectBD()
      const productdUpdated = await Producto.findOneAndUpdate({ _id: productId, idUsuario: dataToUpdate.idUsuario }, { ...dataToUpdate }, { new: true })
      await BD.disconnectBD()

      if (productdUpdated === null) {
        res.status(404).json({ mensaje: 'Producto no encontrado' })
        return
      }

      res.status(200).send(productdUpdated)
    } catch (err) {
      res.status(500).json(err)
    }
  })().catch(error => res.status(500).json({ mensaje: 'Error en el servidor', error }))
}

import { Request, Response } from 'express'
import { añadirProducto } from '../../helpers/serviciosProductos'
import { toRegistrarProducto } from '../../helpers/utils'

export function addUserProduct (req: Request, res: Response): void {
  const bodyRequest = req.body
  const newProduct = toRegistrarProducto(bodyRequest);

  (async () => {
    try {
      await añadirProducto(newProduct)
      res.status(201).json({ mensaje: 'Registro exitoso' })
    } catch (error) {
      res.status(500).json({ error })
    }
  })().catch(err => console.error(err))
}

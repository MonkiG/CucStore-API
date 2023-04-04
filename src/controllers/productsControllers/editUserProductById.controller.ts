import { Request, Response } from 'express'
import pool from './../../bdConnection'
import { IDataToUpdate } from '../../types'

export function editUserProductById (req: Request, res: Response): void {
  const { userId, nombre, descripcion, precio, imgUrl, categoriaId } = req.body
  const { productId } = req.params;

  (async () => {
    try {
      const selectProductsRow = await pool.query('SELECT * FROM TProductos WHERE TUsuarios_id = ? AND id = ?', [userId, productId])
      const [product] = JSON.parse(JSON.stringify(selectProductsRow[0]))
      const dataToUpdate: IDataToUpdate = {
        nombre: nombre ?? product.nombre,
        descripcion: descripcion ?? product.descripcion,
        precio: precio ?? product.precio,
        imgUrl: imgUrl ?? product.imgUrl,
        categoriaId: categoriaId ?? product.categoriaId
      }
      const productUpdated = { ...product, ...dataToUpdate }

      if (JSON.stringify(product).length <= 2) {
        res.status(204).json({ mensaje: 'no se tiene registro de este producto' })
        return
      }

      await pool.query('UPDATE TProductos SET nombre = ?, descripcion = ?, precio = ?, imgUrl = ?, TCategoria_id = ? WHERE TUsuarios_id = ? AND Id = ?', [productUpdated.nombre, productUpdated.descripcion, productUpdated.precio, productUpdated.imgUrl, productUpdated.categoriaId, userId, productId])

      res.status(200).send(productUpdated)
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
  })().catch(error => res.status(500).json({ mensaje: 'Error en el servidor', error }))
}

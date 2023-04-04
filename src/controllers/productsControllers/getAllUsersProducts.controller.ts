import { Request, Response } from 'express'
import pool from './../../bdConnection'
import { IRequestItem } from '../../types'

export function getAllProducts (_req: Request, res: Response): void {
  (async () => {
    try {
      const [rows] = await pool.query(`SELECT TUsuarios.id as usuarioId, TUsuarios.nombre as usuarioNombre, TUsuarios.Apellido as usuarioApellido, 
        TProductos.id as productoId, TProductos.nombre as productoNombre, TProductos.precio as productoPrecio, TProductos.puntaje as productoPuntaje, TProductos.imgUrl as productoImgUrl,
        TCategoria.id as categoriaId, TCategoria.categoria as nombreCategoria
        FROM ((TUsuarios 
        INNER JOIN TProductos ON TProductos.TUsuarios_id = TUsuarios.id)
        INNER JOIN TCategoria ON TProductos.TCategoria_id = TCategoria.id)`)
      const data = JSON.parse(JSON.stringify(rows))

      const ordenatedData = data.map((item: IRequestItem) => {
        return {
          usuario: {
            id: item.usuarioId,
            nombre: item.usuarioNombre,
            apellido: item.usuarioApellido,
            producto: {
              id: item.productId,
              nombre: item.productoNombre,
              precio: item.productoPrecio,
              puntaje: item.productoPuntaje,
              categoria: {
                id: item.categoriaId,
                nombre: item.nombreCategoria
              }
            }
          }
        }
      })

      res.status(200).send(ordenatedData)
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
  })().catch(error => res.status(500).json({ mensaje: 'Error en el servidor', error }))
}

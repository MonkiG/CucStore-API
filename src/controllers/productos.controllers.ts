import { Request, Response } from 'express'
import pool from '../bdConnection'
import { IRequestItem } from '../types'

export function addUserProduct (req: Request, res: Response): void {
  const { nombre, descripcion, precio, imgUrl, categoria, userId } = req.body;

  (async () => {
    try {
      await pool.query('INSERT INTO TProductos (nombre, descripcion, precio, TUsuarios_id, TCategoria_id, imgUrl) VALUES (?,?,?,?,?,?)', [nombre, descripcion, Number(precio), userId, Number(categoria), imgUrl])
      res.status(201).json({ mensaje: 'Registro exitoso' })
    } catch (error) {
      res.status(500).json({ mensaje: 'Error', error })
    }
  })().catch(error => res.send(500).json({ mensaje: 'Error en el servidor', error }))

  res.status(200)
}

export function getUserProducts (req: Request, res: Response): void {
  const { userId } = req.body;

  (async () => {
    const rows = await pool.query('SELECT * FROM TProductos WHERE TUsuarios_id = ?', [userId])

    if (JSON.stringify(rows).length <= 2) {
      res.status(204).json({ mensaje: 'El usuario no cuenta con productos' })
      return
    }

    res.status(200).send(rows[0])
  })().catch(error => res.send(500).json({ mensaje: 'Error en el servidor', error }))
}

export function deleteUserProduct (req: Request, res: Response): void {
  const { userId } = req.body
  const { productId } = req.params;

  (async () => {
    try {
      await pool.query('DELETE FROM TProductos Where id = ? and TUsuarios_id = ?', [productId, userId])
      res.status(204).json({ mensaje: 'Eliminado con exito' })
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
  })().catch(error => res.status(500).json({ mensaje: 'Error en el servidor', error }))
}

/* Agregar funcionalidad */

// export function editUserProduct (req: Request, res: Response): void {

// }

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

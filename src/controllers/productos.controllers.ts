import { Request, Response } from 'express'
import pool from '../bdConnection'

/* TODO: AGREGAR VALIDACION DE TOKENS DE USUARIO */

export function addUserProduct (req: Request, res: Response): void {
  console.log('here')

  const { userId } = req.params
  const { nombre, descripcion, precio, imgUrl, categoria } = req.body;

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
  const { userId } = req.params;

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
  const { userId, productId } = req.params;

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

// export function getAllProducts (): void {

// }

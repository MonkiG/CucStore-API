import { Request, Response } from 'express'
import pool from '../../bdConnection'

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

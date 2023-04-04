import { Request, Response } from 'express'
import pool from '../../bdConnection'

export function deleteUserProductById (req: Request, res: Response): void {
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

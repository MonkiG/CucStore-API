import { Request, Response } from 'express'
import pool from '../../bdConnection'

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

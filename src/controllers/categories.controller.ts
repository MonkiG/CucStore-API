import { Request, Response } from 'express'
import * as BD from './../helpers/bdActions'
import { Categoria } from './../models/TCategorias.model'

export default function getCategories (_req: Request, res: Response): void {
  (async () => {
    try {
      await BD.connectBD()
      const categorias = await Categoria.find({})
      await BD.disconnectBD()

      if (categorias.length > 0) {
        res.status(200).json(categorias)
        return
      }

      res.status(404).json({ mensaje: 'No hay categorias para mostrar' })
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
  })().catch(err => console.error(err))
}

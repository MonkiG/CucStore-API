import { NextFunction, Request, Response } from 'express'
import { Usuario } from './../models/TUsuarios.model'
import { RegistrarUsuario } from './../types'
import { connectBD, disconnectBD } from './../helpers/bdActions'

export function checkUserExists (req: Request, res: Response, next: NextFunction): void {
  const { correo }: RegistrarUsuario = req.body;

  (async () => {
    try {
      await connectBD()
      const isRegistered = await Usuario.findOne({ correo }).exec()

      if (isRegistered !== null) {
        req.body.isRegistered = true
        await disconnectBD()
        next()
      } else {
        req.body.isRegistered = false
        await disconnectBD()
        next()
      }
    } catch (error) {
      res.status(500).json({ mensaje: 'error en el la base de datos', error })
    }
  })().catch((err: Error) => {
    res.status(500).json({ mensaje: 'error en el la base de datos', err })
  })
}

import { NextFunction, Request, Response } from 'express'
import { RegistrarUsuario } from '../types'

export function validateData (req: Request, res: Response, next: NextFunction): void {
  const usuarioData: RegistrarUsuario = req.body

  if (validarCorreo(usuarioData.correo)) {
    next()
  } else {
    res.status(401).json({ mensaje: 'correo no valido, ingresar correo institucional' })
  }
}
const validarCorreo = (correo: string): boolean => {
  const patron = /^([a-zA-Z0-9_.+-])+@(alumnos|academicos)\.udg\.mx$/
  return patron.test(correo)
}

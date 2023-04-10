
import jwt from 'jsonwebtoken'
import { LogearUsuario, RegistrarUsuario } from './../types'
import * as dotenv from 'dotenv'
dotenv.config()

const secret = process.env.JWT_SECRET as string
export function registerTokenGenerator ({ nombres, apellidoPaterno, apellidoMaterno, correo }: RegistrarUsuario): string {
  const payload = {
    sub: 'register',
    name: nombres,
    firtSurname: apellidoPaterno,
    lastSurname: apellidoMaterno,
    email: correo,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 7 * 31)
  }

  const token = jwt.sign(payload, secret)
  return token
}

export function loginTokenGenerator (usuario: LogearUsuario): string {
  const payload = {
    sub: 'login',
    id: usuario.id,
    correo: usuario.correo,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 7 * 31)
  }

  const token = jwt.sign(payload, secret)

  return token
}

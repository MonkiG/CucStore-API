
import jwt from 'jsonwebtoken'
import { LogearUsuario, RegistrarUsuario } from '../types'

const secret = process.env.SECRET ?? '63756373746f7265617069736563726574'
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

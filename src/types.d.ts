import jwt from 'jsonwebtoken'

type correoValido = `${String}@alumnos.udg.mx` | `${String}@academicos.udg.mx`
type imagenValida = `${String}.png` | `${String}.jpg` | `${String}.jpeg`
type contraseñaEncriptada = string & { readonly _brand: unique symbol }
type categoria = 'salado' | 'dulce' | 'otro'

export interface TokenData extends jwt.JWTPayload {
  correo: correoValido
  id: string
}
export interface IUsuario {
  nombres: String
  apellidoPaterno: String
  apellidoMaterno: String
  nombreMarca?: String
  correo: correoValido
  contraseña: contraseñaEncriptada
  imgUrl?: imagenValida
  createdAt: Date
  productos?: Object[]
  telefonos?: string[]
}

export type RegistrarUsuario = Omit<IUsuario, 'nombreMarca' | 'contraseñaEncirptada'
| 'imgUrl' | 'productos' | 'telefonos'> & {
  contraseña: String
  isRegistered?: Boolean
}
export type LogearUsuario = Pick<RegistrarUsuario, 'correo' | 'contraseña'> & { id: String }

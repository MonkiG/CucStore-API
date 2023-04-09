import jwt from 'jsonwebtoken'

type categoria = 'salado' | 'dulce' | 'otro'

export interface TokenData extends jwt.JWTPayload {
  correo: string
  id: string
}

export interface registrarProducto {
  nombre: string
  descripcion: string
  precio: Number
  imgUrl: string
  usuario: string | mongoose.Schema.Types.ObjectId
  categoria: string[] | mongoose.Schema.Types.ObjectId[]
}
export interface IProducto extends registrarProducto {
  puntaje?: Number
}
export interface IUsuario {
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  nombreMarca?: string
  correo: string
  contraseña: string
  imgUrl?: string
  createdAt: Date
  productos?: Object[]
  telefonos?: string[]
}

export type RegistrarUsuario = Omit<IUsuario, 'nombreMarca'
| 'imgUrl' | 'productos' | 'telefonos'> & {

  isRegistered?: Boolean
}
export type LogearUsuario = Pick<RegistrarUsuario, 'correo' | 'contraseña'> & { id: string }

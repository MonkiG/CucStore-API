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
  nombreCompleto: string
  nombreMarca?: string
  correo: string
  contraseña: string
  imgUrl?: string
  createdAt: Date
  productos?: Object[]
  telefonos?: string[]
  isActive: boolean
}

export type RegistrarUsuario = Omit<IUsuario, 'nombreMarca'
| 'imgUrl' | 'productos' | 'telefonos' | 'isActive'> & {

  isRegistered?: Boolean
}
export type LogearUsuario = Pick<RegistrarUsuario, 'correo' | 'contraseña'> & { id: string }

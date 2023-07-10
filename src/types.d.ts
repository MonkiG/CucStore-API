import jwt from 'jsonwebtoken'

type categoria = 'Salado' | 'Dulce' | 'Otro'

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
  telefonos?: string
  isActive: boolean
  chats: IChat[]
}

export interface IChat {
  participantes: IUsuario[]
  messages: IMensaje[]
  createdAt: Date | string
  userToken: string
}

export interface IMensaje {
  texto: string
  user: mongoose.Schema.Types.ObjectId
}

export type RegistrarUsuario = Omit<IUsuario, 'nombreMarca'
| 'imgUrl' | 'productos' | 'telefonos' | 'isActive' | 'chats' | 'timestamp'> & {

  isRegistered?: Boolean
}
export type LogearUsuario = Pick<RegistrarUsuario, 'correo' | 'contraseña'> & { id: string }

import jwt from 'jsonwebtoken'
type userId = number | string
export interface IProducto {
  id: userId
  nombre: string
  descripcion: string
  precio: number
  puntaje?: number
  imgUrl: string
  categoria: string | number
}
export interface TokenData extends jwt.JWTPayload {
  correo: string
  id: string | number
}

export interface IRequestItem {
  usuarioId: number
  usuarioNombre: string
  usuarioApellido: string
  productId: number
  productoNombre: string
  productoPrecio: number
  productoPuntaje: number | null
  categoriaId: number
  nombreCategoria: string
}
export interface IUsuario {
  id?: string | number
  nombre: string
  apellido: string
  correo: string
  contraseña: string
  imgURL?: string
}

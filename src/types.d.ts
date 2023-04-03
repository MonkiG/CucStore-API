
export interface IProducto {
  id: string | number
  nombre: string
  descripcion: string
  precio: number
  puntaje: number
  imgUrl: string
}

export interface IUsuario {
  id?: string | number
  nombre: string
  apellido: string
  correo: string
  contraseña: string
  imgURL?: string
}

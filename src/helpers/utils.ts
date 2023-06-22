import { LogearUsuario, RegistrarUsuario, registrarProducto } from './../types'

export function toRegistrarProducto (object: any): registrarProducto {
  const newProduct: registrarProducto = {
    nombre: parseBasicData(object.nombre),
    descripcion: parseBasicData(object.descripcion),
    precio: parseNumber(+object.precio),
    imgUrl: parseBasicData(object.imgUrl),
    usuario: parseBasicData(object.usuario),
    categoria: [parseBasicData(object.categoria)]
  }

  return newProduct
}

export function toRegistrarUsuario (object: any): RegistrarUsuario {
  const newUser: RegistrarUsuario = {
    nombreCompleto: parseBasicData(object.nombreCompleto),
    contraseña: parseBasicData(object.contraseña),
    correo: parseCorreo(object.correo),
    createdAt: new Date()
  }
  return newUser
}

export function toLogearUsuario (object: any): LogearUsuario {
  const usuario: LogearUsuario = {
    id: parseBasicData(object.id),
    correo: parseCorreo(object.correo),
    contraseña: parseBasicData(object.contraseña)
  }

  return usuario
}

const parseNumber = (data: any): number => {
  if (isNaN(data)) {
    throw new Error('Formato incorrecto')
  }
  return data
}
const parseCorreo = (correoFromRequest: any): string => {
  if (!isString(correoFromRequest) || !isCorreoValido(correoFromRequest)) {
    throw new Error('Correo invalido o campo vacio')
  }

  return correoFromRequest
}

const parseBasicData = (data: any): string => {
  if (!isString(data)) {
    throw new Error('La información no cuenta con el formato correcto')
  }

  return data
}
const isString = (string: any): boolean => {
  return (typeof string === 'string') || string instanceof String
}
const isCorreoValido = (param: any): boolean => {
  const correosValidos: RegExp = /^([a-zA-Z0-9_.+-])+@(alumnos|academicos)\.udg\.mx$/
  return correosValidos.test(param)
}

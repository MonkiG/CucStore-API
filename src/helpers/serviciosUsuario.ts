import { Usuario } from './../models/TUsuarios.model'
import { hashPassword } from './passwordMethods'
import { LogearUsuario, RegistrarUsuario } from './../types'
import { toLogearUsuario } from './utils'
import * as BD from './bdActions'

export async function registrarUsuario (newUsuario: RegistrarUsuario): Promise<void> {
  const contraseñaEncriptada = await hashPassword(newUsuario.contraseña)
  const registeredUser = new Usuario({
    nombres: newUsuario.nombres,
    apellidoPaterno: newUsuario.apellidoPaterno,
    apellidoMaterno: newUsuario.apellidoMaterno,
    correo: newUsuario.correo,
    contraseña: contraseñaEncriptada,
    createdAt: newUsuario.createdAt
  })

  await BD.connectBD()
  await registeredUser.save()
  await BD.disconnectBD()
}

export async function logearUsuario (object: LogearUsuario): Promise<LogearUsuario> {
  const { correo } = object
  await BD.connectBD()
  const usuario = await Usuario.findOne({ correo }).exec()
  await BD.disconnectBD()

  const parseredUsuario = toLogearUsuario(usuario)

  return parseredUsuario
}

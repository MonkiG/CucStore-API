import { Request, Response } from 'express'
import { Usuario } from '../models/TUsuarios.model'
import { RegistrarUsuario } from '../types'
import { hashPassword } from '../helpers/passwordMethods'
import { registerTokenGenerator } from '../helpers/tokenGenerator'
import { connectBD, disconnectBD } from '../helpers/bdActions'

export function registerController (req: Request, res: Response): void {
  const { correo, contraseña, nombres, apellidoPaterno, apellidoMaterno, isRegistered }: RegistrarUsuario = req.body;

  (async () => {
    const contraseñaEncriptada = await hashPassword(contraseña)
    const newUsuario = new Usuario({
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contraseña: contraseñaEncriptada
    })

    if (isRegistered === true) {
      res.status(409).json({ mensaje: 'El correo electronico ingresado ya se encuentra registrado' })
    } else {
      try {
        const token = registerTokenGenerator(newUsuario)
        await connectBD()
        await newUsuario.save()
        res.status(201).json({
          mensaje: 'Usuario registrado correctamente',
          token
        })
        await disconnectBD()
      } catch (error) {
        console.error(error)
      }
    }
  })().catch((err) => console.error(err, 'asdfasdfasdfasdf'))
}

// export function loginController (req: Request, res: Response): void {

// }

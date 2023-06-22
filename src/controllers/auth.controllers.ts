import { Request, Response } from 'express'
import { loginTokenGenerator, registerTokenGenerator } from './../helpers/tokenGenerator'
import { toRegistrarUsuario } from './../helpers/utils'
import * as serviciosUsuario from './../helpers/serviciosUsuario'
import { validatePassword } from './../helpers/passwordMethods'

export function registerController (req: Request, res: Response): void {
  const requestBody = req.body;

  (async () => {
    if (requestBody.isRegistered === true) {
      res.status(409).json({ mensaje: 'El correo electronico ingresado ya se encuentra registrado' })
    } else {
      try {
        const newUsuario = toRegistrarUsuario(requestBody)
        console.log('here1')

        const token = registerTokenGenerator(newUsuario)
        console.log('here2')

        await serviciosUsuario.registrarUsuario(newUsuario)

        console.log('here3')

        res.status(201).json({
          mensaje: 'Usuario registrado correctamente',
          token
        })
      } catch (error) {
        res.status(401).json({ mensaje: 'error en el formato de la información', error })
      }
    }
  })().catch((err) => res.status(500).json({ err }))
}

export function loginController (req: Request, res: Response): void {
  const requestBody = req.body;

  (async () => {
    if (requestBody.isRegistered === true) {
      try {
        const usuario = await serviciosUsuario.logearUsuario(requestBody)
        const match = await validatePassword(requestBody.contraseña, usuario.contraseña)

        if (match) {
          const token = loginTokenGenerator(usuario)
          res.status(200).json({
            mensaje: 'Correcto inicio de sesion',
            token
          })
        } else {
          res.status(401).json({
            mensaje: 'Contraseña equivocada'
          })
        }
      } catch (error) {
        res.status(500).json({ error })
      };
    } else {
      res.status(404).json({
        mensaje: 'Usuario no registrado'
      })
    };
  })().catch((err) => res.status(500).json({ err }))
}

export function getPasswordController (): void {

}

export function updatePasswordController (): void {

}

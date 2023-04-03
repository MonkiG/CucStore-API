import { Request, Response } from 'express'
import pool from '../bdConnection'
import { hashPassword } from '../helpers/hashPassword'

import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export function registerController (req: Request, res: Response): void {
  const { nombre, apellido, correo, contraseña } = req.body

  const secret = process.env.SECRET ?? '63756373746f7265617069736563726574'
  const payload = {
    sub: 'register',
    name: nombre,
    surname: apellido,
    email: correo,
    exp: 60 * 60
  }

  const registerProcess = async (): Promise<void> => {
    const [row] = await pool.query('Select * FROM TUsuarios WHERE correoUdg = ?', [correo])
    const objectRowFix = JSON.parse(JSON.stringify(row))

    if (objectRowFix[0]?.correoUdg === correo) {
      res.status(409).json({
        mensaje: 'Este usuario ya se encuentra registrado'
      })
    } else {
      const hashContraseña = await hashPassword(contraseña)
      await pool.query('INSERT INTO TUSUARIOS (nombre, apellido, correoUdg, contraseña) VALUES (?, ?, ?, ?)', [nombre, apellido, correo, hashContraseña])
      const token = jwt.sign(payload, secret)

      res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        token
      })
    }
  }

  registerProcess().catch(error => res.status(500).json({
    mensaje: 'Error inesperado',
    error
  }))
}

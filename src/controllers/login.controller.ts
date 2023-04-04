import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../bdConnection'

export function loginController (req: Request, res: Response): void {
  const { correo, contraseña } = req.body

  const loginProcess = async (): Promise<void> => {
    const [rows] = await pool.query('SELECT correoUdg, contraseña, id FROM TUsuarios WHERE correoUdg = ?', [correo])
    const objectRowFix = JSON.parse(JSON.stringify(rows))

    if (Object.keys(objectRowFix).length === 0) {
      res.status(404).json({
        mensaje: 'Usuario no registrado o contraseña equivocada'
      })
    } else {
      const match = await bcrypt.compare(contraseña, objectRowFix[0]?.contraseña)

      const secret = process.env.SECRET ?? '63756373746f7265617069736563726574'
      const payload = {
        sub: 'login',
        id: objectRowFix[0].id,
        correo,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 7 * 31)
      }
      if (match) {
        const token = jwt.sign(payload, secret)
        res.status(200).json({
          mensaje: 'correcto inicio de sesion',
          token
        })
      } else {
        res.status(401).json({
          mensaje: 'contraseña equivocada'
        })
      }
    }
  }

  loginProcess().catch(error => res.status(500).json({ mensaje: 'Error en el servido', error }))
}

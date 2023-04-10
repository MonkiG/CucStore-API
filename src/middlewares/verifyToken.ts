import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { TokenData } from './../types'
import * as dotenv from 'dotenv'
dotenv.config()

export function verifyToken (req: Request, res: Response, next: NextFunction): void {
  const { authorization } = req.headers

  if (typeof authorization === 'undefined') {
    res.status(401).json({ mensaje: 'Ingresar authorization header' })
    return
  }
  if (authorization.toLocaleLowerCase().startsWith('bearer')) {
    const token = authorization.split(' ')[1]

    if (token === null || token === undefined) {
      res.status(401).json({ mensaje: 'Ingresar token ' })
    } else {
      const tokenData = jwt.verify(token, process.env.JWT_SECRET as string) as TokenData

      req.body.usuario = tokenData.id

      next()
    }
  } else {
    res.status(401).json({ mensaje: 'Esquema de autenticación incorrecto' })
  }
}

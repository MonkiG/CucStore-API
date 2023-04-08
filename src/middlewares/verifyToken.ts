// import { NextFunction, Request, Response } from 'express'
// import jwt from 'jsonwebtoken'
// import { TokenData } from '../types'

// export function verifyToken (req: Request, res: Response, next: NextFunction): void {
//   try {
//     const { authorization } = req.headers
//     const token = authorization?.split(' ')[1]
//     const tokenData = jwt.verify(token ?? 'undefined', '63756373746f7265617069736563726574') as TokenData
//     console.log(typeof tokenData.id)
//     req.body.userId = tokenData.id

//     next()
//   } catch (error) {
//     res.status(401).json({ mensaje: 'token invalido', error })
//   }
// }

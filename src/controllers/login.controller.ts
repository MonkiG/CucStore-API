import { Request, Response } from 'express'
import pool from '../bdConnection'

export function loginController (_: Request, res: Response): void {
  // const { contraseña } = req.body

  (async function(){
    pool.query("SELECT * FROM TUSUARIOS")
    res.status(200).json({
      message: 'correct response',
    })
  }())

  
}

import { Request, Response } from 'express'
import pool from '../bdConnection'
import { hashPassword } from '../helpers/hashPassword'
import * as dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'

export function registerController(req: Request, res: Response){

    const {nombre, apellido, correo, contraseña} = req.body
    
    const secret = process.env.SECRET ?? '63756373746f7265617069736563726574';
    const payload = {
        sub: "register",
        name: nombre,
        surname: apellido,
        email: correo,
        exp: 60*60
    };
    
    (async () => {
        const hashContraseña = await hashPassword(contraseña);
        console.log(hashContraseña.length);
        
        await pool.query(`INSERT INTO TUSUARIOS (nombre, apellido, correoUdg, contraseña) VALUES ('${nombre}', '${apellido}', '${correo}', '${hashContraseña}')`)
        
        const token = jwt.sign(payload, secret)
        console.log(token);
        res.status(200).json({
            mensaje: 'Usuario registrado exitosamente',
            token
        })
    })();
}
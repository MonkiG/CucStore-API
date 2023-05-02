import { registerController, loginController, getPasswordController, updatePasswordController } from './../controllers/auth.controllers'
import { Router } from 'express'
import { checkUserExists } from './../middlewares/checkUserExists'
import { verifyToken } from './../middlewares/verifyToken'

const router = Router()

router.post('/api/auth/register', checkUserExists, registerController)

router.post('/api/auth/login', checkUserExists, loginController)

router.post('/api/auth/getPassword', verifyToken, getPasswordController)

router.put('/api/auth/updatePassword', verifyToken, updatePasswordController)

export default router

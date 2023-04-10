import { registerController, loginController } from './../controllers/auth.controllers'
import { Router } from 'express'
import { checkUserExists } from './../middlewares/checkUserExists'

const router = Router()

router.post('/api/auth/register', checkUserExists, registerController)

router.post('/api/auth/login', checkUserExists, loginController)

export default router

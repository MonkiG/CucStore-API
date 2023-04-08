import { registerController } from '../controllers/auth.controllers'
import { Router } from 'express'
import { checkUserExists } from '../middlewares/checkUserExists'
import { validateData } from '../middlewares/validateData'

const router = Router()

router.post('/api/auth/register', validateData, checkUserExists, registerController)

// router.post('/api/auth/login', loginController)

export default router

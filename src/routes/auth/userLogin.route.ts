import { Router } from 'express'
import { loginController } from '../../controllers/login.controller'

const router = Router()

router.post('/api/auth/login', loginController)

export default router

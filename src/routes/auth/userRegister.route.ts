import { Router } from 'express'
import { registerController } from '../../controllers/register.controller'

const router = Router()

router.post('/api/auth/register', registerController)

export default router

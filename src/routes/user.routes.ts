import { Router } from 'express'
import getUserInfo from 'src/controllers/userControllers/getUserInfo.controller'
import updateUserInfo from 'src/controllers/userControllers/updateUserInfo.controller'
import deleteUser from 'src/controllers/userControllers/deleteUser.controller'
import { verifyToken } from 'src/middlewares/verifyToken'
const router = Router()

router.get('/api/usuario', verifyToken, getUserInfo)
router.put('/api/usuario', verifyToken, updateUserInfo)
router.delete('/api/usuario', verifyToken, deleteUser)
export default router

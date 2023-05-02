import { Router } from 'express'
import getUserInfo from './../controllers/userControllers/getUserInfo.controller'
import updateUserInfo from './../controllers/userControllers/updateUserInfo.controller'
import deleteUser from './../controllers/userControllers/deleteUser.controller'
import { verifyToken } from './../middlewares/verifyToken'
const router = Router()

router.post('/api/usuario', verifyToken, getUserInfo)
router.put('/api/usuario', verifyToken, updateUserInfo)
router.delete('/api/usuario', verifyToken, deleteUser)
export default router

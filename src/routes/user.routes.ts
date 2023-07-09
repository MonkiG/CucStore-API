import { Router } from 'express'
import getUserInfo from './../controllers/userControllers/getUserInfo.controller'
import updateUserInfo from './../controllers/userControllers/updateUserInfo.controller'
import deleteUser from './../controllers/userControllers/deleteUser.controller'
import { verifyToken } from './../middlewares/verifyToken'
import createNewChat from './../controllers/ChatControllers/createNewChat.controller'
const router = Router()

router.get('/api/usuario', verifyToken, getUserInfo)
router.post('/api/usuario/chats/chat', verifyToken, createNewChat)
router.put('/api/usuario', verifyToken, updateUserInfo)
router.delete('/api/usuario', verifyToken, deleteUser)
export default router

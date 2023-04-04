import { Router } from 'express'
import { addUserProduct, getUserProducts, deleteUserProduct } from '../controllers/productos.controllers'
import { verifyToken } from '../middlewares/verifyToken'
const router = Router()

router.get('/api/usuario/productos', verifyToken, getUserProducts)

router.post('/api/usuario/productos', verifyToken, addUserProduct)

// router.put('/api/usuario/productos/:productId', editUserProduct)

router.delete('/api/usuario/productos/:productId', verifyToken, deleteUserProduct)

export default router

import { Router } from 'express'
import { addUserProduct, getUserProducts, deleteUserProduct } from '../controllers/productos.controllers'
const router = Router()

router.get('/api/productos/usuario/:userId', getUserProducts)

router.post('/api/productos/usuario/:userId', addUserProduct)

// router.put('/api/productos/usuario/:userId/:productId', editUserProduct)

router.delete('/api/productos/usuario/:userId/:productId', deleteUserProduct)

export default router

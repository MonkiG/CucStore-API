import { Router } from 'express'
import { getAllProducts } from '../controllers/productsControllers/getAllUsersProducts.controller'

const router = Router()

router.get('/api/productos', getAllProducts)

export default router

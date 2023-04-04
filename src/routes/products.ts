import { Router } from 'express'
import { getAllProducts } from '../controllers/productos.controllers'

const router = Router()

router.get('/api/productos', getAllProducts)

export default router

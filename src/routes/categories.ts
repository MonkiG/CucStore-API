import { Router } from 'express'
import getCategories from './../controllers/categories.controller'
const router = Router()

router.get('/api/categorias', getCategories)

export default router

import { Router } from 'express'
import { getAllProducts } from './../controllers/productsControllers/getAllUsersProducts.controller'
import { getProductByName } from './../controllers/productsControllers/getProductByName.controller'

const router = Router()

router.get('/api/productos', getAllProducts)
router.get('/api/productos/:nombre', getProductByName)
export default router

import { Router } from 'express'
import { getUserProducts } from './../controllers/productsControllers/getUserProducts.controller'
import { addUserProduct } from './../controllers/productsControllers/addUserProduct.controller'
import { editUserProductById } from './../controllers/productsControllers/editUserProductById.controller'
import { deleteUserProductById } from './../controllers/productsControllers/deleteUserProductById.controller'
import { verifyToken } from './../middlewares/verifyToken'

const router = Router()

router.get('/api/usuario/productos', verifyToken, getUserProducts)

router.post('/api/usuario/productos', verifyToken, addUserProduct)

router.put('/api/usuario/productos', verifyToken, editUserProductById)

router.delete('/api/usuario/productos', verifyToken, deleteUserProductById)

export default router

import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

import authRoutes from './routes/auth.routes'
import userProductsRoutes from './routes/userProducts'
import productsRoutes from './routes/products'
import categoriesRoutes from './routes/categories'
import userRoutes from './routes/user.routes'
import { Categoria } from './models/TCategorias.model'
import * as BD from './helpers/bdActions'
dotenv.config();

(async () => {
  await BD.connectBD()
  await Categoria.findOneAndUpdate({ nombre: 'dulce' }, { descripcion: 'Productos dulces' }, { upsert: true, new: true, setDefaultOnInser: true })
  await Categoria.findOneAndUpdate({ nombre: 'salado' }, { descripcion: 'Productos salados' }, { upsert: true, new: true, setDefaultOnInser: true })
  await Categoria.findOneAndUpdate({ nombre: 'otro' }, { descripcion: 'Productos variados' }, { upsert: true, new: true, setDefaultOnInser: true })
  await BD.disconnectBD()
})().catch(err => console.error(err))

const app = express()

app.set('port', process.env.PORT)
app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use(authRoutes)
app.use(productsRoutes)
app.use(userProductsRoutes)
app.use(categoriesRoutes)
app.use(userRoutes)

app.get('/api', (_, res) => {
  res.json({
    auth: ['/api/auth/register', '/api/auth/login'],
    userProducts: ['/api/usuario/productos', '/api/usuario/productos/:productId'],
    products: ['/api/productos', '/api/productos/:nombre']
  })
})

export default app

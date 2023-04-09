import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import userProductsRoutes from './routes/userProducts'
import productsRoutes from './routes/products'
import { Categoria } from './models/TCategorias.model';

(async () => {
  await Categoria.findOneAndUpdate({ nombre: 'dulce' }, { descripcion: 'Productos dulces' }, { upsert: true, new: true, setDefaultOnInser: true })
  await Categoria.findOneAndUpdate({ nombre: 'salado' }, { descripcion: 'Productos salados' }, { upsert: true, new: true, setDefaultOnInser: true })
  await Categoria.findOneAndUpdate({ nombre: 'otro' }, { descripcion: 'Productos variados' }, { upsert: true, new: true, setDefaultOnInser: true })
})().catch(err => console.error(err))

const app = express()

app.set('port', process.env.PORT ?? 3000)
app.use(cors())
app.use(express.json())
app.use(authRoutes)
app.use(productsRoutes)
app.use(userProductsRoutes)

app.get('/', (_, res) => {
  res.send('Hola, Mundo')
})

export default app

import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import userProductsRoutes from './routes/userProducts'
import productsRoutes from './routes/products'


import * as dotenv from 'dotenv'
dotenv.config();



const app = express()

app.set('port', process.env.PORT)
app.use(cors())
app.use(express.json())
app.use(authRoutes)
app.use(productsRoutes)
app.use(userProductsRoutes)

app.get('/', (_, res) => {
  res.send('Hola, Mundo')
})

export default app

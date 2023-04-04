import express from 'express'
import * as dotenv from 'dotenv'
import loginRoute from './routes/auth/userLogin.route'
import registerRoute from './routes/auth/userRegister.route'
import userProductsRoutes from './routes/userProducts'
import products from './routes/products'
dotenv.config()
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(registerRoute)
app.use(loginRoute)
app.use(products)
app.use(userProductsRoutes)

app.get('/', (_, res) => {
  res.send('Hola, Mundo')
})

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: ${PORT}`)
})

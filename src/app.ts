import express from 'express'
import cors from 'cors'
import loginRoute from './routes/auth/userLogin.route'
import registerRoute from './routes/auth/userRegister.route'
import userProductsRoutes from './routes/userProducts'
import productsRoutes from './routes/products'

const app = express()

app.use(cors())
app.use(express.json())
app.use(registerRoute)
app.use(loginRoute)
app.use(productsRoutes)
app.use(userProductsRoutes)

app.get('/', (_, res) => {
  res.send('Hola, Mundo')
})

export default app

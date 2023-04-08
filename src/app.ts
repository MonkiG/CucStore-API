import express from 'express'
import cors from 'cors'
// import loginRoute from './routes/auth/userLogin.route'
import authRoutes from './routes/auth.routes'
// import userProductsRoutes from './routes/userProducts'
// import productsRoutes from './routes/products'

const app = express()

app.set('port', process.env.PORT ?? 3000)
app.use(cors())
app.use(express.json())
app.use(authRoutes)
// app.use(loginRoute)
// app.use(productsRoutes)
// app.use(userProductsRoutes)

app.get('/', (_, res) => {
  res.send('Hola, Mundo')
})

export default app

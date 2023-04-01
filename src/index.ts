import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

app.get('/', (_, res) => {
  res.send('Hola, Mundo')
})

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: ${PORT}`)
})

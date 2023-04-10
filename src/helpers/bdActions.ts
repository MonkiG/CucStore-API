import { connect, connection } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

export async function connectBD (): Promise<void> {
  const mongoURI = process.env.MONGODB_URI as string
  const dbName = process.env.MONGODB_NAME as string
  const user = process.env.MONGODB_USER as string
  const pass = process.env.MONGODB_PASSWORD as string
  const isProduction = process.env.NODE_ENV === 'production'

  const options = isProduction
    ? { dbName, user, pass }
    : { dbName }

  await connect(mongoURI, options)
}

export async function disconnectBD (): Promise<void> {
  await connection.close()
}

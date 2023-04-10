import { connect, connection } from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

export async function connectBD (): Promise<void> {
  await connect(process.env.MONGODB_URI as string, { dbName: process.env.MONGODB_NAME as string })
}

export async function disconnectBD (): Promise<void> {
  await connection.close()
}

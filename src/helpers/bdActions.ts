import { connect, connection } from 'mongoose'
import config from '../config/config'

export async function connectBD (): Promise<void> {
  await connect(config.DB.URI, { dbName: config.DB.DB_NAME })
}

export async function disconnectBD (): Promise<void> {
  await connection.close()
}

import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'cucstore',
  password: 'RAHA1234'
})

export default pool

import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: '',
  password: process.env.PASSWORD_DB
})

export default pool

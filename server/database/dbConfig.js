import postgres from 'postgres'
import dotenv from 'dotenv'
dotenv.config()

const pgOptions = {
  transform: {
    ...postgres.camel,
  },
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
}

export const sql = postgres(process.env.DB_URL, pgOptions)

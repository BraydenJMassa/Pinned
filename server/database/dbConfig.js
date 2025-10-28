import postgres from 'postgres'
import dotenv from 'dotenv'
dotenv.config()

// Sets up postgres database in express application
const pgOptions = {
  transform: {
    ...postgres.camel,
  },
  // ssl is required in production, not in development
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
}

export const sql = postgres(process.env.DB_URL, pgOptions)

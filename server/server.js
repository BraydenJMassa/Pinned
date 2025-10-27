import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import https from 'https'
dotenv.config()

// Import routes
import userRoutes from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { authCheck } from './middlewares/authCheck.js'

// Setting up express server
const app = express()
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://todo-app-eta-two-96.vercel.app'],
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

// Configure user routes
app.use('/api/user', userRoutes)
app.use('/api/todo', authCheck, todoRoutes)
app.use('/api/auth', authRoutes)

// Define the path to the SSL certificate and key files

// const options = {
//   key: fs.readFileSync('./ssl/key.pem'), // Path to your private key file
//   cert: fs.readFileSync('./ssl/cert.pem'), // Path to your certificate file
// }

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`HTTP server running on port ${PORT}`))

// Start the HTTPS server on port 3000
// https.createServer(options, app).listen(PORT, () => {
//   console.log(`HTTPS server running on port ${PORT}`)
// })

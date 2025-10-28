import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import https from 'https'
dotenv.config()

// Import routes
import userRoutes from './routes/userRoutes.js'
import pinRoutes from './routes/pinRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { authCheck } from './middlewares/authCheck.js'

// Setting up express server
const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://pinned-roan.vercel.app',
]
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json())
app.use(cookieParser())

// Configure user routes
app.use('/api/user', userRoutes)
app.use('/api/pin', authCheck, pinRoutes)
app.use('/api/auth', authRoutes)

// Define the path to the SSL certificate and key files

// const options = {
//   key: fs.readFileSync('./ssl/key.pem'), // Path to your private key file
//   cert: fs.readFileSync('./ssl/cert.pem'), // Path to your certificate file
// }

const PORT = process.env.PORT || 4000

app.use((err, req, res, next) => {
  console.error('Error stack:', err)
  res.status(500).json({ message: 'Server error', error: err.message })
})

app.listen(PORT, () => console.log(`HTTP server running on port ${PORT}`))

// Start the HTTPS server on port 3000
// https.createServer(options, app).listen(PORT, () => {
//   console.log(`HTTPS server running on port ${PORT}`)
// })

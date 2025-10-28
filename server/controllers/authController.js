import jwt from 'jsonwebtoken'
import { sql } from '../database/dbConfig.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import {
  createAccessToken,
  createRefreshToken,
} from '../utils/generateTokens.js'
import { REFRESH_COOKIE_OPTIONS } from '../utils/cookieOptions.js'
dotenv.config()

// Controller function to register a user to the database
export const registerUser = async (req, res) => {
  const { email, password } = req.body
  try {
    // Checks if user already exists with this email
    const [currentUser] = await sql`SELECT * FROM users WHERE email = ${email}`
    // If user exists, exit with failed status
    if (currentUser) {
      return res.status(400).json({ error: 'Email already in use' })
    }
    // Hash password and attempt to insert new user into database
    const hashedPassword = await bcrypt.hash(password, 10)
    const [newUser] =
      await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword}) RETURNING *`
    // Create access and refresh tokens
    const accessToken = createAccessToken(newUser)
    const refreshToken = createRefreshToken(newUser)
    // Send refresh token to the HTTPOnly cookie
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    // Registration successful
    res.status(201).json({ userId: newUser.userId, accessToken })
  } catch (err) {
    // Server error
    res.status(500).json({ error: err.message })
  }
}

// Controller function to login user
export const loginUser = async (req, res) => {
  const { password } = req.body
  try {
    // If passwords do not match, fail with "Incorrect password" message
    const passwordsMatch = await bcrypt.compare(password, req.user.password)
    if (!passwordsMatch) {
      return res.status(400).json({ error: 'Incorrect password' })
    }
    // Create access and refresh tokens
    const accessToken = createAccessToken(req.user)
    const refreshToken = createRefreshToken(req.user)
    // Send refresh token to the HTTPOnly cookie
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    // Login successful
    res.status(200).json({ userId: req.user.userId, accessToken })
  } catch (err) {
    // Server error
    res.status(500).json({ error: err.message })
  }
}

// Controller function to logout user
export const logoutUser = (req, res) => {
  // Clear refresh token cookie
  res.clearCookie('refreshToken', REFRESH_COOKIE_OPTIONS)
  res.status(200).json({ message: 'Logout successful' })
}

// Controller function to validate refresh token
export const validateRefreshToken = async (req, res) => {
  // Gets refresh token from request
  const refreshToken = req.cookies.refreshToken
  // If no refresh token, function fails
  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token available' })
  }
  try {
    // Attempts to verify refresh token against refresh token secret
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    // Ensures a user exists in the database with refresh token's credentials
    const [user] =
      await sql`SELECT * FROM users WHERE user_id = ${decodedRefreshToken.userId}`
    // If user no longer exists, function fails
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    // Generates new access token and sends it to the client
    const accessToken = createAccessToken(decodedRefreshToken)
    res.status(201).json({ userId: decodedRefreshToken.userId, accessToken })
  } catch (err) {
    // Catches "TokenExpiredError" for expired refresh token
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ error: 'Refresh token expired' })
    }
    // All other errors go here
    res.status(403).json({ error: 'Invalid or expired refresh token' })
  }
}

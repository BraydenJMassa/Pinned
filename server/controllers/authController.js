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

export const registerUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const [currentUser] = await sql`SELECT * FROM users WHERE email = ${email}`
    if (currentUser) {
      return res.status(400).json({ error: 'Email already in use' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const [newUser] =
      await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword}) RETURNING *`
    // Create access and refresh tokens
    const accessToken = createAccessToken(newUser)
    const refreshToken = createRefreshToken(newUser)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    res.status(201).json({ userId: newUser.userId, accessToken })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const loginUser = async (req, res) => {
  const { password } = req.body
  try {
    const passwordsMatch = await bcrypt.compare(password, req.user.password)
    if (!passwordsMatch) {
      return res.status(400).json({ error: 'Incorrect password' })
    }

    // Create access and refresh tokens
    const accessToken = createAccessToken(req.user)
    const refreshToken = createRefreshToken(req.user)

    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    res.status(200).json({ userId: req.user.userId, accessToken })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie('refreshToken', REFRESH_COOKIE_OPTIONS)
  res.status(200).json({ message: 'Logout successful' })
}

export const validateRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token available' })
  }
  try {
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    const [user] =
      await sql`SELECT * FROM users WHERE user_id = ${decodedRefreshToken.userId}`
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const accessToken = createAccessToken(decodedRefreshToken)
    res.status(201).json({ userId: decodedRefreshToken.userId, accessToken })
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ error: 'Refresh token expired' })
    }
    res.status(403).json({ error: 'Invalid or expired refresh token' })
  }
}

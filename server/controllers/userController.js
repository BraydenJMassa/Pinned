import { sql } from '../database/dbConfig.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

// Controller function to ensure user exists with specified "email"
// Does not use "checkUserExistsByEmail" middleware because a success
// response is still sent if user does not exist (for registration page)
export const checkEmailExists = async (req, res) => {
  const { email } = req.body
  // If email is not provided in request body, function fails with "Email is required"
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  try {
    // Checks if email exists in database
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`
    // Email exists in database, sends "exists: true" to client
    if (user) {
      return res.status(200).json({ exists: true })
    }
    // Email does not exist in database, sends "exists: false" to client
    else {
      return res.status(200).json({ exists: false })
    }
  } catch (err) {
    // Server error
    return res.status(500).json({ error: err.message })
  }
}

// Controller function to fetch all pins for specified user
export const getPinsForUser = async (req, res) => {
  // Ensures user is authenticated and exists in "authCheck" and "checkUserExistsById" middlewares
  const { userId } = req.params
  const token = req.token
  // Ensures userId in params matches the authenticated user's userId
  if (!token || token.userId !== userId) {
    return res.status(401).json({ error: 'Unauthorized user' })
  }
  try {
    // Attempts to get pins for user
    const pins =
      await sql`SELECT * FROM pins WHERE user_id = ${userId} ORDER BY completed ASC, created_at DESC`
    // Operation successful, returns list of pins to client
    return res.status(200).json(pins)
  } catch (err) {
    // Server error
    res.status(500).json({ error: err.message })
  }
}

/*
 *
 *  Unused functions below
 *
 */

// Controller function to get all users
export const getUsers = async (req, res) => {
  try {
    // Attempt to retrieve all users
    const users = await sql`SELECT user_id, email FROM users`
    // Operation successful, returns all users
    res.status(200).json(users)
  } catch (err) {
    // Server error
    res.status(500).json({ error: err.message })
  }
}

// Gets user by userId
export const getUser = async (req, res) => {
  // req.user must exist because of "checkUserExists" middleware
  delete req.user.password
  res.status(200).json(req.user)
}

// Controller function to delete user from database
export const deleteUser = async (req, res) => {
  const { userId } = req.params
  try {
    // Attempt to delete user
    await sql`DELETE FROM users WHERE user_id = ${userId}`
    // Operation successful, user has been deleted
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    // Server error
    res.status(500).json({ error: err.message })
  }
}

// Controller function to update a user's password
export const updatePassword = async (req, res) => {
  // Password field was validated by "validatePassword" middleware
  const { userId } = req.params
  const updatedHashedPassword = await bcrypt.hash(req.user.password, 10)
  try {
    const [updatedUser] =
      await sql`UPDATE users SET password = ${updatedHashedPassword} WHERE user_id = ${userId} RETURNING user_id, email`
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

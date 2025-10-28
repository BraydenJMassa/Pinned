import { sql } from '../database/dbConfig.js'

// Middleware to ensure user exists with provided userId
export const checkUserExistsById = async (req, res, next) => {
  const { userId } = req.params
  // Ensures "userId" is a parameter in the api call
  if (!userId) {
    return res.status(400).json({ error: 'userId not found in params' })
  }
  try {
    // Attempts to find user in database
    const [user] = await sql`SELECT * FROM users WHERE user_id = ${userId}`
    // User not found
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    // User was found, so user is appended to request and sent
    // back to the invoking controller function
    req.user = user
    next()
  } catch (err) {
    // Server error
    res.status(500).json({ error: err.message })
  }
}

// Middleware to ensure user exists with provided email
export const checkUserExistsByEmail = async (req, res, next) => {
  const { email } = req.body
  // Ensures "email" is a parameter in the api call
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  try {
    // Attempts to find user in database
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`
    // User not found
    if (!user) {
      return res.status(404).json({ error: 'No user with that email' })
    }
    // User was found, so user is appended to request and sent
    // back to the invoking controller function
    req.user = user
    next()
  } catch (err) {
    // Server error
    res.status(500).json({ error: err.message })
  }
}

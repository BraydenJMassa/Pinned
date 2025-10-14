import { sql } from '../database/dbConfig.js'

export const checkUserExistsById = async (req, res, next) => {
  const { userId } = req.params
  try {
    const [user] = await sql`SELECT * FROM users WHERE user_id = ${userId}`
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    req.user = user
    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const checkUserExistsByEmail = async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  try {
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`
    if (!user) {
      return res.status(404).json({ error: 'No user with that email' })
    }
    req.user = user
    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

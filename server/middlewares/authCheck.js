import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authCheck = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'User unauthorized' })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.token = decodedToken
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' })
  }
}

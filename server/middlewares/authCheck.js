import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Middleware to ensure user is authenticated
export const authCheck = async (req, res, next) => {
  // Gets authHeader from request Authorization header
  const authHeader = req.headers.authorization
  // If authHeader does not start with "Bearer", user is not authenticated
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  // Retrieve token from authorization header
  const token = authHeader.split(' ')[1]
  // If token does not exist, user is unauthenticated
  if (!token) {
    return res.status(401).json({ error: 'User unauthorized' })
  }
  try {
    // Decode token from request and send back to controller invoking this
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.token = decodedToken
    next()
  } catch (err) {
    // Invalid token, function fails
    return res.status(400).json({ error: 'Invalid token' })
  }
}

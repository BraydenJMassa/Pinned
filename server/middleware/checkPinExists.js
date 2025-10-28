import { sql } from '../database/dbConfig.js'

// Middleware to ensure pin exists with provided pinId
const checkPinExists = async (req, res, next) => {
  const { pinId } = req.params
  // Ensures "pinId" is a parameter in the api call
  if (!pinId) {
    return res.status(400).json({ error: 'pinId not found in params' })
  }
  try {
    // Attempts to find pin in database
    const [pin] = await sql`SELECT * FROM pins WHERE pin_id = ${pinId}`
    // Pin not found
    if (!pin) {
      return res.status(404).json({ error: 'Pin not found' })
    }
    // Pin was found, so pin is appended to request and sent
    // back to the invoking controller function
    req.pin = pin
    next()
  } catch (err) {
    // Server error
    return res.status(500).json({ error: err.message })
  }
}

export default checkPinExists

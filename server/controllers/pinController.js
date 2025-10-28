import { sql } from '../database/dbConfig.js'

// Controller function to create new pin
export const createPin = async (req, res) => {
  const { description } = req.body
  // If no user was provided through the Authentication function, fail with "Unauthorized" flag
  if (!req.token?.userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  // Get user
  const userId = req.token.userId
  // Cannot create pin with no description
  if (!description) {
    return res.status(400).json({ error: 'Description must be provided' })
  }
  try {
    // Ensure user exists in the database
    const [user] = await sql`SELECT * FROM users WHERE user_id = ${userId}`
    if (!user) {
      return res.status(404).json({ error: 'No user with specified user_id' })
    }
    // Attempts to create new pin for the specified user
    const [newPin] =
      await sql`INSERT INTO pins (user_id, description) VALUES (${userId}, ${description}) RETURNING *`
    // Operation successful, new pin was created
    res.status(201).json(newPin)
  } catch (err) {
    // Server error
    res.status(500).json({ error: err.message })
  }
}

// Controller function to update description of an existing pin
export const updatePin = async (req, res) => {
  // Pin was already confirmed in "checkPinExists" middleware
  const pinId = req.pin.pinId
  // Ensures description was provided in request body
  const { description } = req.body
  if (!description) {
    return res.status(400).json({ error: 'Description required to update pin' })
  }
  try {
    // Attempts to update pin in database
    const [updatedPin] =
      await sql`UPDATE pins SET description = ${description} WHERE pin_id = ${pinId} RETURNING *`
    // Operation successful, pin was updated
    return res.status(200).json(updatedPin)
  } catch (err) {
    // Server error
    return res.status(500).json({ error: err.message })
  }
}

// Controller function to toggle "completed" field for pin
export const toggleComplete = async (req, res) => {
  // Pin was already confirmed in "checkPinExists" middleware
  const pinId = req.pin.pinId
  try {
    // Attempt to update "completed" field in specified pin
    await sql`UPDATE pins SET completed = ${!req.pin
      .completed} WHERE pin_id = ${pinId}`
    // Operation successful, pin "completed" field toggled
    return res
      .status(200)
      .json({ message: '"Completed" toggled successfully for pin' })
  } catch (err) {
    // Server error
    return res.status(500).json({ error: err.message })
  }
}

// Controller function to delete pin
export const deletePin = async (req, res) => {
  // Pin was already confirmed in "checkPinExists" middleware
  const pinId = req.pin.pinId
  try {
    // Attempt to delete pin from database
    await sql`DELETE FROM pins WHERE pin_id = ${pinId}`
    // Operation successful, pin was deleted
    return res.status(200).json({ message: 'Pin deleted successfully' })
  } catch (err) {
    // Server error
    return res.status(500).json({ error: err.message })
  }
}

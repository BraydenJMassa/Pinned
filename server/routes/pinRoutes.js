// Import controller functions
import {
  createPin,
  updatePin,
  deletePin,
  toggleComplete,
} from '../controllers/pinController.js'
import checkPinExists from '../middlewares/checkPinExists.js'

// Initialize router
import express from 'express'
const router = express.Router()

// Create new pin
router.post('/', createPin)
// Update pin description
router.put('/:pinId', checkPinExists, updatePin)
// Toggles the completed field
router.patch('/togglecompleted/:pinId', checkPinExists, toggleComplete)
// Delete pin
router.delete('/:pinId', checkPinExists, deletePin)

export default router

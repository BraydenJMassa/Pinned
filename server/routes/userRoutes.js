// Import controller functions
import {
  getUsers,
  getUser,
  updatePassword,
  deleteUser,
  getPinsForUser,
  checkEmailExists,
} from '../controllers/userController.js'

// Import middlewares
import { authCheck } from '../middleware/authCheck.js'
import { checkUserExistsById } from '../middleware/checkUserExists.js'
import validatePassword from '../middleware/validatePassword.js'

// Initialize router
import express from 'express'
const router = express.Router()

// Get all users
router.get('/', getUsers)

// Get user with id
router.get('/:userId', checkUserExistsById, getUser)

// Checks if user exists by email
router.post('/check-email', checkEmailExists)

// Update user's password
router.put('/:userId', validatePassword, checkUserExistsById, updatePassword)

// Delete user
router.delete('/:userId', checkUserExistsById, deleteUser)

// Get pins for user
router.get('/pin/:userId', authCheck, checkUserExistsById, getPinsForUser)

export default router

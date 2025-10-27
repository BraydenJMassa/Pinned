import express from 'express'
const router = express.Router()

// Import user controller functions
import {
  getUsers,
  getUser,
  updatePassword,
  deleteUser,
  getTodosForUser,
  checkEmailExists,
} from '../controllers/userController.js'
import { authCheck } from '../middlewares/authCheck.js'
import { checkUserExistsById } from '../middlewares/checkUserExists.js'
import validatePassword from '../middlewares/validatePassword.js'

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

// Get todos for user
router.get('/todo/:userId', authCheck, checkUserExistsById, getTodosForUser)

export default router

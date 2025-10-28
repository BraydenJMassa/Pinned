// Import controller functions
import {
  loginUser,
  registerUser,
  validateRefreshToken,
  logoutUser,
} from '../controllers/authController.js'

// Import middleware
import validateEmail from '../middleware/validateEmail.js'
import validatePassword from '../middleware/validatePassword.js'
import { checkUserExistsByEmail } from '../middleware/checkUserExists.js'

// Initialize router
import express from 'express'
const router = express.Router()

// Register user
router.post('/register', validateEmail, validatePassword, registerUser)

// Login user
router.post(
  '/login',
  validateEmail,
  validatePassword,
  checkUserExistsByEmail,
  loginUser
)

// Logs out user
router.post('/logout', logoutUser)

// Validate refresh token
router.post('/refresh', validateRefreshToken)

export default router

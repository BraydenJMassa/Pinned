import { ChangeEvent, useState } from 'react'
import validator from 'validator'

// Custom hook to validate login form
const useLoginFormValidation = () => {
  // Local state to track errors in the email or password fields
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  // Set to true when validated, giving a green border around the field
  const [success, setSuccess] = useState({
    email: false,
    password: false,
  })

  // Tracks if user has interacted with the field, so
  // errors only occur after user leaves the field
  const [hasBlurred, setHasBlurred] = useState({
    email: false,
    password: false,
  })

  // Validation function to validate user input in the email field
  const validateEmail = (email: string) => {
    if (!email || !validator.isEmail(email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email' }))
      setSuccess((prev) => ({ ...prev, email: false }))
    } else {
      setErrors((prev) => ({ ...prev, email: '' }))
      setSuccess((prev) => ({ ...prev, email: true }))
    }
  }

  // Validation function to validate user input in the password field
  const validatePassword = (password: string) => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }))
      setSuccess((prev) => ({ ...prev, password: false }))
    } else {
      setErrors((prev) => ({ ...prev, password: '' }))
      setSuccess((prev) => ({ ...prev, password: true }))
    }
  }

  // Waits for change on the input, and attempts to
  // validate fields when user exits the field
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email' && hasBlurred.email) validateEmail(value)
    if (name === 'password' && hasBlurred.password) validatePassword(value)
  }

  // Waits for user to exit the field, and attempts validating the inputs
  const handleBlur = (
    name: 'email' | 'password',
    inputValues: { email: string; password: string }
  ) => {
    setHasBlurred((prev) => ({ ...prev, [name]: true }))
    if (name === 'email') validateEmail(inputValues.email)
    if (name === 'password') validatePassword(inputValues.password)
  }

  // Executs a "Email not found" error, for when user
  // attempts logging in with an unknown email
  const executeEmailNotFoundError = () => {
    setErrors((prev) => ({
      ...prev,
      email: 'No account found with this email',
    }))
    setSuccess({ email: false, password: false })
  }

  // Executes an "Incorrect password" error when user inputs an incorrect password
  const executeIncorrectPasswordError = () => {
    setErrors((prev) => ({ ...prev, password: 'Incorrect password' }))
    setSuccess((prev) => ({ ...prev, password: false }))
  }

  // Execute an "Unknown error" when server fails or something unexpected occurs
  const executeUnknownError = () => {
    setErrors((prev) => ({
      ...prev,
      email: 'Unknown error, please try again.',
    }))
    setSuccess({ email: false, password: false })
  }

  // Attempts to validate fields, returning a boolean of its success
  const validateAll = (inputValues: { email: string; password: string }) => {
    validateEmail(inputValues.email)
    validatePassword(inputValues.password)
    return validator.isEmail(inputValues.email) && inputValues.password
  }

  // Functions exported for use in the Login page
  return {
    errors,
    success,
    handleBlur,
    handleInputChange,
    validateAll,
    executeEmailNotFoundError,
    executeIncorrectPasswordError,
    executeUnknownError,
  }
}

export default useLoginFormValidation

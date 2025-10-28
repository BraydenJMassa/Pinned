import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import validator from 'validator'

// Type declaration for useRegistrationFormValidation props
// These are passed from the Register page, as the state is managed there
type RegisterValidationProps = {
  inputValues: {
    email: string
    password: string
    confirmPassword: string
  }
  setInputValues: Dispatch<
    SetStateAction<{ email: string; password: string; confirmPassword: string }>
  >
}

// Initial booleans object for errors/success/blur state
const initialBools = {
  email: false,
  password: false,
  confirmPassword: false,
}

// Custom hook to validate Registration form
const useFormValidation = ({
  inputValues,
  setInputValues,
}: RegisterValidationProps) => {
  // Local state to track errors on each field
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  // Local state to track successful validations on each field
  const [success, setSuccess] = useState(initialBools)
  // Tracks if user has interacted with the field, so
  // errors only occur after user leaves the field
  const [hasBlurred, setHasBlurred] = useState(initialBools)

  // Destructure fields from props
  const { email, password, confirmPassword } = inputValues

  // Baseline execute error function, to execute
  // an error on an invalidated field
  const executeError = (inputField: string, error: string) => {
    setErrors((prev) => ({ ...prev, [inputField]: error }))
    setSuccess((prev) => ({ ...prev, [inputField]: false }))
  }

  // Execute success function to show a field is validated
  const executeSuccess = (inputField: string) => {
    setSuccess((prev) => ({ ...prev, [inputField]: true }))
    setErrors((prev) => ({ ...prev, [inputField]: '' }))
  }

  // Removes success and errors from input field, giving default values
  const executeDefault = (inputField: string) => {
    setSuccess((prev) => ({ ...prev, [inputField]: false }))
    setErrors((prev) => ({ ...prev, [inputField]: '' }))
  }

  // Validates "email" field based on Registration page logic
  const validateEmail = () => {
    if (!email || !validator.isEmail(email)) {
      executeError('email', 'Please enter a valid email')
    } else {
      executeSuccess('email')
    }
  }

  // Validates "password" field based on Registration page logic
  const validatePassword = () => {
    if (!password || !validator.isStrongPassword(password)) {
      executeError(
        'password',
        'Must contain 1 uppercase letter, 1 number, and 1 special character'
      )
    } else {
      executeSuccess('password')
    }
  }

  // Validates "confirm password" field based on Registration page logic
  const validateConfirmPassword = () => {
    if (!confirmPassword || !validator.isStrongPassword(confirmPassword)) {
      executeError(
        'confirmPassword',
        'Must contain 1 uppercase letter, 1 number, and 1 special character'
      )
    } else if (password !== confirmPassword) {
      executeError('confirmPassword', 'Passwords do not match')
    } else {
      executeSuccess('confirmPassword')
    }
  }

  // Helper function to validate specific field based on input provided
  const validate = (inputField: string) => {
    switch (inputField) {
      case 'email':
        validateEmail()
        break
      case 'password':
        validatePassword()
        break
      case 'confirmPassword':
        validateConfirmPassword()
        break
      default:
        break
    }
  }

  // Validates all fields and returns a boolean based on the success or failure of validation
  const validateAll = () => {
    validateEmail()
    validatePassword()
    validateConfirmPassword()
    return (
      validator.isEmail(email) &&
      validator.isStrongPassword(password) &&
      password === confirmPassword
    )
  }

  // Listens for change on the input fields and validates fields as required
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
    if (
      hasBlurred[name as keyof typeof hasBlurred] &&
      inputValues[name as keyof typeof inputValues]
    ) {
      validate(name)
    }
  }

  // Waits for user to exit the field, and attempts validating the input
  const handleBlur = (inputField: string) => {
    if (inputValues[inputField as keyof typeof inputValues]) {
      setHasBlurred((prev) => ({ ...prev, [inputField]: true }))
      validate(inputField)
    } else {
      executeDefault(inputField)
    }
  }

  // Executes an "Email already in use" error when an email in use is submitted
  const executeEmailInUseError = () => {
    setErrors((prev) => ({ ...prev, email: 'Email already in use' }))
    setSuccess((prev) => ({
      ...prev,
      email: false,
      password: false,
      confirmPassword: false,
    }))
  }

  // Execute an "Unknown error" when server fails or something unexpected occurs
  const executeUnknownError = () => {
    setErrors((prev) => ({
      ...prev,
      email: 'Unknown error, please try again.',
    }))
    setSuccess({ email: false, password: false, confirmPassword: false })
  }

  // Functions exported for use in the Register page
  return {
    errors,
    success,
    validate,
    validateAll,
    handleInputChange,
    handleBlur,
    executeEmailInUseError,
    executeUnknownError,
  }
}

export default useFormValidation

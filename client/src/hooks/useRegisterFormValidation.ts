import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import validator from 'validator'

type Props = {
  inputValues: {
    email: string
    password: string
    confirmPassword: string
  }
  setInputValues: Dispatch<
    SetStateAction<{ email: string; password: string; confirmPassword: string }>
  >
}

const initialBools = {
  email: false,
  password: false,
  confirmPassword: false,
}

const useFormValidation = ({ inputValues, setInputValues }: Props) => {
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [success, setSuccess] = useState(initialBools)
  const [hasBlurred, setHasBlurred] = useState(initialBools)

  const { email, password, confirmPassword } = inputValues

  const executeError = (inputField: string, error: string) => {
    setErrors((prev) => ({ ...prev, [inputField]: error }))
    setSuccess((prev) => ({ ...prev, [inputField]: false }))
  }

  const executeSuccess = (inputField: string) => {
    setSuccess((prev) => ({ ...prev, [inputField]: true }))
    setErrors((prev) => ({ ...prev, [inputField]: '' }))
  }

  const executeDefault = (inputField: string) => {
    setSuccess((prev) => ({ ...prev, [inputField]: false }))
    setErrors((prev) => ({ ...prev, [inputField]: '' }))
  }

  const validateEmail = () => {
    if (!email || !validator.isEmail(email)) {
      executeError('email', 'Please enter a valid email')
    } else {
      executeSuccess('email')
    }
  }

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

  const handleBlur = (inputField: string) => {
    if (inputValues[inputField as keyof typeof inputValues]) {
      setHasBlurred((prev) => ({ ...prev, [inputField]: true }))
      validate(inputField)
    } else {
      executeDefault(inputField)
    }
  }

  const executeEmailInUseError = () => {
    setErrors((prev) => ({ ...prev, email: 'Email already in use' }))
    setSuccess((prev) => ({
      ...prev,
      email: false,
      password: false,
      confirmPassword: false,
    }))
  }

  return {
    errors,
    success,
    validate,
    validateAll,
    handleInputChange,
    handleBlur,
    executeEmailInUseError,
  }
}

export default useFormValidation

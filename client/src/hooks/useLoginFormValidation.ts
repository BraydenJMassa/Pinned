import { ChangeEvent, useState } from 'react'
import validator from 'validator'

const useLoginFormValidation = () => {
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const [success, setSuccess] = useState({
    email: false,
    password: false,
  })
  const [hasBlurred, setHasBlurred] = useState({
    email: false,
    password: false,
  })

  const validateEmail = (email: string) => {
    if (!email || !validator.isEmail(email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email' }))
      setSuccess((prev) => ({ ...prev, email: false }))
    } else {
      setErrors((prev) => ({ ...prev, email: '' }))
      setSuccess((prev) => ({ ...prev, email: true }))
    }
  }

  const validatePassword = (password: string) => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }))
      setSuccess((prev) => ({ ...prev, password: false }))
    } else {
      setErrors((prev) => ({ ...prev, password: '' }))
      setSuccess((prev) => ({ ...prev, password: true }))
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email' && hasBlurred.email) validateEmail(value)
    if (name === 'password' && hasBlurred.password) validatePassword(value)
  }

  const handleBlur = (
    name: 'email' | 'password',
    inputValues: { email: string; password: string }
  ) => {
    setHasBlurred((prev) => ({ ...prev, [name]: true }))
    if (name === 'email') validateEmail(inputValues.email)
    if (name === 'password') validatePassword(inputValues.password)
  }

  const executeEmailNotFoundError = () => {
    setErrors((prev) => ({
      ...prev,
      email: 'No account found with this email',
    }))
    setSuccess({ email: false, password: false })
  }

  const executeIncorrectPasswordError = () => {
    setErrors((prev) => ({ ...prev, password: 'Incorrect password' }))
    setSuccess((prev) => ({ ...prev, password: false }))
  }

  const validateAll = (inputValues: { email: string; password: string }) => {
    validateEmail(inputValues.email)
    validatePassword(inputValues.password)
    return validator.isEmail(inputValues.email) && !!inputValues.password
  }

  return {
    errors,
    success,
    handleBlur,
    handleInputChange,
    validateAll,
    executeEmailNotFoundError,
    executeIncorrectPasswordError,
  }
}

export default useLoginFormValidation

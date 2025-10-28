import { FormEvent, useEffect, useState } from 'react'
import FormInput from '../components/FormInput'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router-dom'
import useRegisterFormValidation from '../hooks/useRegisterFormValidation'
import { initialRegisterInputValues } from '../utils/constants'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'

// Register page
const Register = () => {
  // Sets variables for input values of text inputs
  const [inputValues, setInputValues] = useState(initialRegisterInputValues)

  // Imports necessary Registration Validation functions
  const {
    errors,
    success,
    validateAll,
    handleBlur,
    handleInputChange,
    executeEmailInUseError,
    executeUnknownError,
  } = useRegisterFormValidation({
    inputValues,
    setInputValues,
  })

  // Imports necessary auth and navigate functions
  const { setAuth, clearAuth } = useAuth()
  const navigate = useNavigate()

  // Sets page title
  useEffect(() => {
    document.title = 'Pinned · Register'
  }, [])

  // Called when user attempts to submit Register form
  const handleSubmit = async (e: FormEvent) => {
    // Attempts to validate inputs
    e.preventDefault()
    const isValid = validateAll()
    // If inputs are not valid, exit function
    if (!isValid) {
      return
    }
    // Sets email to lowercase, as is expected in database
    const normalizedEmail = inputValues.email.toLowerCase()
    try {
      // Checks to make sure email doesn't exist in database
      const emailCheck = await axios.post('/api/user/check-email', {
        email: normalizedEmail,
      })
      // If email already exists, execute an "Email in use" error and clears auth state
      if (emailCheck.data.exists) {
        executeEmailInUseError()
        setInputValues({ ...inputValues, password: '', confirmPassword: '' })
        clearAuth()
        return
      }
    } catch (err) {
      // Unknown errors handled here
      executeUnknownError()
      setInputValues({ ...inputValues, password: '', confirmPassword: '' })
      clearAuth()
    }
    // Registration logic
    try {
      // Attempts to register new account to server
      const response = await axios.post('/api/auth/register', {
        email: normalizedEmail,
        password: inputValues.password,
      })
      // If successful, sets auth state to new user
      setAuth({
        userId: response.data.userId,
        accessToken: response.data.accessToken,
      })
      // Navigates user to dashboard
      navigate('/dashboard')
    } catch (err) {
      // If unsuccessful, clears auth state
      clearAuth()
    }
  }

  // Register page markup
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className='form-heading'>Register</h1>
        <FormInput
          type='text'
          labelText='Email'
          name='email'
          placeholder='Enter your email'
          value={inputValues.email}
          handleChange={handleInputChange}
          handleBlur={() => handleBlur('email')}
          error={errors.email}
          success={success.email}
        />
        <FormInput
          type='password'
          labelText='Password'
          name='password'
          placeholder='Enter your password'
          value={inputValues.password}
          handleChange={handleInputChange}
          handleBlur={() => handleBlur('password')}
          error={errors.password}
          success={success.password}
        />
        <FormInput
          type='password'
          labelText='Confirm Password'
          name='confirmPassword'
          placeholder='Re-enter your password'
          value={inputValues.confirmPassword}
          handleChange={handleInputChange}
          handleBlur={() => handleBlur('confirmPassword')}
          error={errors.confirmPassword}
          success={success.confirmPassword}
        />
        <button className='submit-btn'>Register</button>
        <div className='auth-toggle'>
          Already have an account?{' '}
          <Link to='/login' className='auth-toggle-link'>
            Login
          </Link>
        </div>
      </form>
    </>
  )
}

export default Register

import { FormEvent, useEffect, useState } from 'react'
import FormInput from '../components/FormInput'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import useLoginFormValidation from '../hooks/useLoginFormValidation'
import { initialLoginInputValues } from '../utils/constants'

// Login page
const Login = () => {
  // Sets variables for input values of text inputs
  const [inputValues, setInputValues] = useState(initialLoginInputValues)

  // Imports necessary Login Validation functions
  const {
    errors,
    success,
    handleBlur,
    handleInputChange,
    validateAll,
    executeEmailNotFoundError,
    executeIncorrectPasswordError,
    executeUnknownError,
  } = useLoginFormValidation()

  // Imports necessary auth and navigate functions
  const { setAuth, clearAuth } = useAuth()
  const navigate = useNavigate()

  // Sets page title
  useEffect(() => {
    document.title = 'Pinned · Login'
  }, [])

  // Called when user attempts to submit Login form
  const handleSubmit = async (e: FormEvent) => {
    // Attempts to validate inputs
    e.preventDefault()
    const isValid = validateAll(inputValues)
    // If inputs are not valid, exit function
    if (!isValid) return
    // Sets email to lowercase, as is expected in database
    const normalizedEmail = inputValues.email.toLowerCase()
    try {
      // Checks to make sure email exists in database
      const emailCheck = await axios.post('/api/user/check-email/', {
        email: normalizedEmail,
      })
      // If email does not exist, execute an "Email not found" error
      if (!emailCheck.data.exists) {
        executeEmailNotFoundError()
        setInputValues({ ...inputValues, password: '' })
        return
      }
      // Sends login info to server, which should respond with the access token
      const response = await axios.post('/api/auth/login', {
        email: normalizedEmail,
        password: inputValues.password,
      })
      // Sets global auth state to authenticated user
      setAuth({
        userId: response.data.userId,
        accessToken: response.data.accessToken,
      })
      // Navigate user to dashboard
      navigate('/dashboard')
    } catch (err: any) {
      // When user inputs incorrect password, executes this error
      if (err.response?.data?.error === 'Incorrect password') {
        executeIncorrectPasswordError()
      } else {
        // Unknown errors handled here
        executeUnknownError()
      }
      // Clears authentication state on login error
      clearAuth()
    }
  }

  // Login page markup
  return (
    <form id='login-form' onSubmit={handleSubmit}>
      <h1 className='form-heading'>Login</h1>
      <FormInput
        type='text'
        labelText='Email'
        name='email'
        placeholder='Enter your email'
        value={inputValues.email}
        handleChange={(e) => {
          setInputValues({ ...inputValues, email: e.target.value })
          handleInputChange(e)
        }}
        handleBlur={() => handleBlur('email', inputValues)}
        error={errors.email}
        success={success.email}
      />
      <FormInput
        type='password'
        labelText='Password'
        name='password'
        placeholder='Enter your password'
        value={inputValues.password}
        handleChange={(e) => {
          setInputValues({ ...inputValues, password: e.target.value })
          handleInputChange(e)
        }}
        handleBlur={() => handleBlur('password', inputValues)}
        error={errors.password}
        success={success.password}
      />
      <button className='submit-btn'>Login</button>
      <div className='auth-toggle'>
        Don't have an account?{' '}
        <Link className='auth-toggle-link' to='/register'>
          Register
        </Link>
      </div>
    </form>
  )
}

export default Login

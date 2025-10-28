import { FormEvent, useState } from 'react'
import FormInput from '../components/FormInput'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import useLoginFormValidation from '../hooks/useLoginFormValidation'

const Login = () => {
  const [inputValues, setInputValues] = useState({ email: '', password: '' })
  const {
    errors,
    success,
    handleBlur,
    handleInputChange,
    validateAll,
    executeEmailNotFoundError,
    executeIncorrectPasswordError,
  } = useLoginFormValidation()
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isValid = validateAll(inputValues)
    if (!isValid) return

    try {
      const emailCheck = await axios.post('/api/user/check-email/', {
        email: inputValues.email,
      })
      if (!emailCheck.data.exists) {
        executeEmailNotFoundError()
        return
      }

      const response = await axios.post('/api/auth/login', {
        email: inputValues.email,
        password: inputValues.password,
      })

      setAuth({
        userId: response.data.userId,
        accessToken: response.data.accessToken,
      })
      navigate('/dashboard')
    } catch (err: any) {
      console.error(err)
      if (err.response?.data?.error === 'Incorrect password') {
        executeIncorrectPasswordError()
      } else {
        executeEmailNotFoundError()
      }
      setAuth({ userId: '', accessToken: '' })
    }
  }

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

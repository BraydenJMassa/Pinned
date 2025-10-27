import { FormEvent, useState } from 'react'
import FormInput from '../components/FormInput'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  })
  const [emailError, setEmailError] = useState('')
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validator.isEmail(inputValues.email)) {
      setEmailError('Please enter a valid email')
      return
    }
    // Login logic goes here
    try {
      const response = await axios.post('/api/auth/login', {
        email: inputValues.email,
        password: inputValues.password,
      })
      setAuth({
        userId: response.data.userId,
        accessToken: response.data.accessToken,
      })
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setAuth({ userId: '', accessToken: '' })
    }
  }
  return (
    <>
      <form id='login-form' onSubmit={handleSubmit}>
        <h1 className='form-heading'>Login</h1>
        <FormInput
          type='text'
          labelText='Email'
          name='email'
          placeholder='Enter your email'
          value={inputValues.email}
          handleChange={(e) =>
            setInputValues({ ...inputValues, email: e.target.value })
          }
          handleBlur={() => {}}
          error={emailError}
          success={false}
        />
        <FormInput
          type='password'
          labelText='Password'
          name='password'
          placeholder='Enter your password'
          value={inputValues.password}
          handleChange={(e) =>
            setInputValues({ ...inputValues, password: e.target.value })
          }
          handleBlur={() => {}}
          error=''
          success={false}
        />
        <button className='submit-btn'>Login</button>
        <div className='auth-toggle'>
          Don't have an account?{' '}
          <Link className='auth-toggle-link' to='/register'>
            Register
          </Link>
        </div>
      </form>
    </>
  )
}

export default Login

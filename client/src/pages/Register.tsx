import { FormEvent, useState } from 'react'
import FormInput from '../components/FormInput'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router-dom'
import useRegisterFormValidation from '../hooks/useRegisterFormValidation'
import { initialRegisterInputValues } from '../utils/constants'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'

const Register = () => {
  const [inputValues, setInputValues] = useState(initialRegisterInputValues)
  const {
    errors,
    success,
    validateAll,
    handleBlur,
    handleInputChange,
    executeEmailInUseError,
  } = useRegisterFormValidation({
    inputValues,
    setInputValues,
  })
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isValid = validateAll()
    if (!isValid) {
      return
    }

    try {
      const emailCheck = await axios.post('/api/user/check-email', {
        email: inputValues.email,
      })
      if (emailCheck.data.exists) {
        executeEmailInUseError()
        setInputValues({
          email: inputValues.email,
          password: '',
          confirmPassword: '',
        })
        return
      }
    } catch (err) {
      console.error(err)
      setAuth({ userId: '', accessToken: '' })
    }
    // Register logic
    try {
      const response = await axios.post('/api/auth/register', {
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

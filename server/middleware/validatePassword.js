import validator from 'validator'

// Middleware to validate password before entering into database
const validatePassword = (req, res, next) => {
  const { password } = req.body
  // Ensures "password" is a parameter in the api call
  if (!password) {
    return res.status(400).json({ error: 'Password field required' })
  }
  // Provided password is not valid format, fails with descriptive error message
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error:
        'Password must contain 8 characters, an uppercase letter, a number, and a symbol',
    })
  }
  // Password is valid, so invoking controller function continues
  next()
}

export default validatePassword

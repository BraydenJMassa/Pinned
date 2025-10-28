import validator from 'validator'

// Middleware to validate email before entering into database
const validateEmail = (req, res, next) => {
  const { email } = req.body
  // Ensures "email" is a parameter in the api call
  if (!email) {
    return res.status(400).json({ error: 'Email field required' })
  }
  // Provided email is not valid format, fails with "Invalid email" message
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: 'Invalid email',
    })
  }
  // Email is valid, so invoking controller function continues
  next()
}

export default validateEmail

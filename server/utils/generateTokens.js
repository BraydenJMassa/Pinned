import jwt from 'jsonwebtoken'

export const createAccessToken = (user) => {
  return jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '30m',
    }
  )
}

export const createRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  )
}

import axios from 'axios'
import { AuthType } from '../types/AuthType'

type useRefreshProps = {
  setAuth: (auth: AuthType) => void
  clearAuth: () => void
}

// Custom hook to attempt to refresh access token based on if the user has
// a valid refresh token in the database
const useRefresh = ({ setAuth, clearAuth }: useRefreshProps) => {
  const refresh = async () => {
    try {
      // Checks to see if there is a valid refresh token
      const response = await axios.post(
        '/api/auth/refresh',
        {},
        { withCredentials: true }
      )
      // If successful, updates global auth state with new access token
      setAuth({
        userId: response.data.userId,
        accessToken: response.data.accessToken,
      })

      return response.data.accessToken
    } catch (err) {
      // No refresh token available, clears global authentication state
      clearAuth()
      return null
    }
  }

  return { refresh }
}

export default useRefresh

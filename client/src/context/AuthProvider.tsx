import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import useRefresh from '../hooks/useRefresh'
import { AuthType } from '../types/AuthType'

// AuthContext type declaration to define functions to be extracted from useAuth hook
type AuthContextType = {
  auth: AuthType
  setAuth: Dispatch<SetStateAction<AuthType>>
  logout: () => Promise<void>
  clearAuth: () => void
}

// Initializes AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Defines AuthProvider element to wrap in our application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Global auth state initialized
  const [auth, setAuth] = useState<AuthType>({
    userId: '',
    accessToken: '',
  })
  // Function to clear global authentication state
  const clearAuth = () => {
    setAuth({ userId: '', accessToken: '' })
  }

  // Import refresh hook to attempt to refresh access token
  const { refresh } = useRefresh({ setAuth, clearAuth })
  // Local loading state to ensure other processes halt while trying to refresh access token
  const [loading, setLoading] = useState(true)

  // Logout function
  const logout = async () => {
    try {
      // Attempts to log user out by calling server's "logout" API endpoint
      await axios.post(
        '/api/auth/logout',
        {},
        {
          withCredentials: true,
        }
      )
    } catch (err) {
      console.error(err)
    } finally {
      // Clear auth state when user is logged out successfully
      clearAuth()
    }
  }

  // Attempts to refresh access token one time when mounted
  useEffect(() => {
    const tryRefresh = async () => {
      const newToken = await refresh()
      if (!newToken) {
        clearAuth()
      }
      setLoading(false)
    }
    tryRefresh()
  }, [])

  // Displays loading spinner when process is loading
  if (loading)
    return (
      <div className='loading-container'>
        <div className='spinner' />
      </div>
    )

  // AuthProvider markup to be wrapped around application
  // Functions from here cannot be accessed from anywhere, only
  // from children of this Provider
  return (
    <AuthContext.Provider value={{ auth, setAuth, clearAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

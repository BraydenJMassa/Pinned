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

type AuthType = {
  userId: string
  accessToken: string
}

type AuthContextType = {
  auth: AuthType
  setAuth: Dispatch<SetStateAction<AuthType>>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>({
    userId: '',
    accessToken: '',
  })

  const [loading, setLoading] = useState(true)

  const clearAuth = () => {
    setAuth({ userId: '', accessToken: '' })
  }

  const logout = async () => {
    try {
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
      clearAuth()
    }
  }

  const { refresh } = useRefresh(setAuth)

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

  if (loading) return <div>Loading...</div>

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

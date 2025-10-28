import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

// Custom hook to access authContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  // If context is undefined, it is trying to be accessed outside of an AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

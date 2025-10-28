import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ReactNode } from 'react'

// Props for ProtectedRoute element
type ProtectedRouteProps = {
  children: ReactNode
}

// ProtectedRoute element to protect routes from unauthenticated users
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAuth()

  if (!auth.accessToken) {
    return <Navigate to='/login' />
  }

  return <>{children}</>
}

export default ProtectedRoute

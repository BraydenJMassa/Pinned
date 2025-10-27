import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ReactNode } from 'react'

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAuth()

  if (!auth.accessToken) {
    return <Navigate to='/login' />
  }

  return <>{children}</>
}

export default ProtectedRoute

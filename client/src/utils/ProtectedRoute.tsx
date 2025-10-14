import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ReactNode, useEffect } from 'react'
import useRefresh from '../hooks/useRefresh'
import { useLogoutModal } from '../hooks/useLogoutModal'
import LogoutModal from '../components/LogoutModal'

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAuth()
  const { showLogoutModal } = useLogoutModal()

  if (!auth.accessToken) {
    return <Navigate to='/' />
  }
  return (
    <>
      {showLogoutModal && <LogoutModal />}
      {children}
    </>
  )
}

export default ProtectedRoute

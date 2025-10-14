import { useContext } from 'react'
import LogoutModalContext from '../context/LogoutModalProvider'

export const useLogoutModal = () => {
  const context = useContext(LogoutModalContext)
  if (!context) {
    throw new Error('useLogoutModal must be used within an LogoutModalProvider')
  }
  return context
}

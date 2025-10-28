import { useContext } from 'react'
import ModalContext from '../context/ModalProvider'

// Custom hook to access authContext
export const useModal = () => {
  const context = useContext(ModalContext)
  // If context is undefined, it is trying to be accessed outside of a ModalProvider
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

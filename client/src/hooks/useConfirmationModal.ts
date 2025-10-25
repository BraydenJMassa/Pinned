import { useContext } from 'react'
import ConfirmationModalContext from '../context/ConfirmationModalProvider'

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext)
  if (!context) {
    throw new Error(
      'useConfirmationModal must be used within an ConfirmationModalProvider'
    )
  }
  return context
}

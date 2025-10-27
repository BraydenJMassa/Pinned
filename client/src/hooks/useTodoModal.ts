import { useContext } from 'react'
import TodoModalContext from '../context/TodoModalProvider'

export const useTodoModal = () => {
  const context = useContext(TodoModalContext)
  if (!context) {
    throw new Error('useTodoModal must be used within an TodoModalProvider')
  }
  return context
}

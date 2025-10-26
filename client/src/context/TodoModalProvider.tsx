import { createContext, ReactNode, useCallback, useState } from 'react'
import TodoModal from '../components/TodoModal'

type ModalOptions = {
  onConfirm: () => void
  onCancel?: () => void
  initialDesc?: string
  title: string
}

type TodoModalContextType = {
  showModal: boolean
  openModal: (options: ModalOptions) => void
  closeModal: () => void
}

const TodoModalContext = createContext<TodoModalContextType | undefined>(
  undefined
)

export const TodoModalProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false)
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null)

  const openModal = useCallback((options: ModalOptions) => {
    setModalOptions(options)
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const handleConfirm = () => {
    modalOptions?.onConfirm()
    closeModal()
  }

  const handleCancel = () => {
    modalOptions?.onCancel?.()
    closeModal()
  }

  return (
    <TodoModalContext.Provider value={{ showModal, openModal, closeModal }}>
      {children}
      {showModal && modalOptions && (
        <TodoModal
          initialDesc={''}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          title={modalOptions.title}
        />
      )}
    </TodoModalContext.Provider>
  )
}

export default TodoModalContext

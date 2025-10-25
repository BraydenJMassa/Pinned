import { createContext, ReactNode, useCallback, useState } from 'react'
import ConfirmationModal from '../components/ConfirmationModal'

type ModalOptions = {
  title: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel?: () => void
}

type ConfirmationModalContext = {
  showModal: boolean
  openModal: (options: ModalOptions) => void
  closeModal: () => void
}

const ConfirmationModalContext = createContext<
  ConfirmationModalContext | undefined
>(undefined)

export const ConfirmationModalProvider = ({
  children,
}: {
  children: ReactNode
}) => {
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
    <ConfirmationModalContext.Provider
      value={{ showModal, openModal, closeModal }}
    >
      {children}
      {showModal && modalOptions && (
        <ConfirmationModal
          title={modalOptions.title}
          confirmText={modalOptions.confirmText}
          cancelText={modalOptions.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationModalContext.Provider>
  )
}

export default ConfirmationModalContext

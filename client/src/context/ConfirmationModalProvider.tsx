import { createContext, ReactNode, useCallback, useState } from 'react'
import ConfirmationModal from '../components/ConfirmationModal'

type ModalOptions = {
  title: string
  onConfirm: () => void
  onCancel?: () => void
}

type ConfirmationModalContextType = {
  showModal: boolean
  openConfirmationModal: (options: ModalOptions) => void
  closeConfirmationModal: () => void
}

const ConfirmationModalContext = createContext<
  ConfirmationModalContextType | undefined
>(undefined)

export const ConfirmationModalProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [showModal, setShowModal] = useState(false)
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null)

  const openConfirmationModal = useCallback((options: ModalOptions) => {
    setModalOptions(options)
    setShowModal(true)
  }, [])

  const closeConfirmationModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const handleConfirm = () => {
    modalOptions?.onConfirm()
    closeConfirmationModal()
  }

  const handleCancel = () => {
    modalOptions?.onCancel?.()
    closeConfirmationModal()
  }

  return (
    <ConfirmationModalContext.Provider
      value={{
        showModal,
        openConfirmationModal,
        closeConfirmationModal,
      }}
    >
      {children}
      {showModal && modalOptions && (
        <ConfirmationModal
          title={modalOptions.title}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationModalContext.Provider>
  )
}

export default ConfirmationModalContext

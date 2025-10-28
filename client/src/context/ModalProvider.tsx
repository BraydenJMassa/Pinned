import { createContext, ReactNode, useCallback, useState } from 'react'
import Modal from '../components/Modal'
import EditPinTextarea from '../components/EditPinTextarea'

// Base parameters for all modals
type BaseOptions = {
  title: string
  onCancel?: () => void
}

// Modal options for "Confirmation" modals (Logout and Delete pin modals)
type ConfirmationOptions = BaseOptions & {
  type: 'confirmation'
  onConfirm: () => void
}

// Modal options for "Pin" modals (Edit and Create pin modals)
type PinOptions = BaseOptions & {
  type: 'pin'
  onConfirm: (desc: string) => void
  initialDesc: string
}

// Modal options type, can either be "Confirmation" type or "Pin" type
type ModalOptions = ConfirmationOptions | PinOptions

// ModalContext type declaration to define functions to be extracted from useModal hook
type ModalContextType = {
  showModal: boolean
  openModal: (options: ModalOptions) => void
  closeModal: () => void
}

// Initializes ModalContext
const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Defines ModalProvider element to wrap in our application
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  // Global Modal state initialized. Desc only used for "Pin" modals
  const [showModal, setShowModal] = useState(false)
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null)
  const [desc, setDesc] = useState('')

  // Function called to open a Modal
  const openModal = useCallback((options: ModalOptions) => {
    setModalOptions(options)
    if (options.type === 'pin') setDesc(options.initialDesc || '')
    setShowModal(true)
  }, [])

  // Function called to close a Modal
  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [])

  // Called to confirm a Modal. Uses "desc" param for "pin" Modals
  const handleConfirm = () => {
    if (!modalOptions) return
    if (modalOptions.type === 'pin') modalOptions.onConfirm(desc)
    else modalOptions.onConfirm()
    closeModal()
  }

  // Exits a modal, clearing relevant state
  const handleCancel = () => {
    modalOptions?.onCancel?.()
    closeModal()
  }

  // ModalProvider markup to be wrapped around application
  // Functions from here cannot be accessed from anywhere, only
  // from children of this Provider
  return (
    <ModalContext.Provider value={{ showModal, openModal, closeModal }}>
      {children}
      {showModal && modalOptions && (
        <Modal
          title={modalOptions.title}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmText={modalOptions.type === 'confirmation' ? 'Yes' : 'Submit'}
          cancelText={modalOptions.type === 'confirmation' ? 'No' : 'Cancel'}
          type={modalOptions.type}
        >
          {modalOptions.type === 'pin' && (
            <EditPinTextarea desc={desc} setDesc={setDesc} />
          )}
        </Modal>
      )}
    </ModalContext.Provider>
  )
}

export default ModalContext

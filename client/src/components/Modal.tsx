import { ReactNode, useEffect } from 'react'
import '../styles/Modal.css'

// Type declaration for Props of Modal element
type ModalProps = {
  title: string
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  children?: ReactNode
  type: string
}

// Modal element that displays when confirming logout/deletion of pin,
// or when creating/editing a pin
const Modal = ({
  title,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
  type,
}: ModalProps) => {
  // When modal is open, clicking outside the modal automatically exits the modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onCancel) onCancel()
  }

  // Initializes Modal on mount
  useEffect(() => {
    // Adds key listener for "Escape" and "Enter" keys
    // Enter key submits the modal, escape key exits the modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) onCancel()
      if (e.key === 'Enter') {
        e.preventDefault()
        onConfirm()
      }
    }
    // Applies listener to window on mount, and destroys listener on unmount
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel, onConfirm])

  // Modal markup
  return (
    <div className='modal-backdrop' onClick={handleBackdropClick}>
      <div
        className={`modal ${type === 'pin' ? 'pin-modal' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className='modal-x-btn' onClick={onCancel}>
          ×
        </button>
        <h1 className='modal-title'>{title}</h1>
        {children}
        <div className='modal-btns'>
          <button className='modal-btn green-btn' onClick={onConfirm}>
            {confirmText}
          </button>
          <button className='modal-btn red-btn' onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal

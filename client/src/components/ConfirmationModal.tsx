import '../styles/Modal.css'

type ConfirmationModalProps = {
  title: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationModal = ({
  title,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <div className='confirmation-modal'>
      <button className='modal-x-btn' onClick={onCancel}>
        x
      </button>
      <h1>{title}</h1>
      <div className='modal-btns'>
        <button className='modal-btn green-btn' onClick={onConfirm}>
          Yes
        </button>
        <button className='modal-btn red-btn' onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal

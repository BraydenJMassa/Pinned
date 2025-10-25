import '../styles/ConfirmationModal.css'

type ConfirmationModalProps = {
  title: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationModal = ({
  title,
  confirmText = 'Yes',
  cancelText = 'No',
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
        <button className='modal-btn red-btn' onClick={onCancel}>
          {cancelText}
        </button>
        <button className='modal-btn green-btn' onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal

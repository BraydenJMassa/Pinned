import { useEffect, useState } from 'react'
import '../styles/Modal.css'
import EditTodoTextarea from './EditTodoTextarea'

type TodoModalProps = {
  onConfirm: (desc: string) => void
  onCancel?: () => void
  title: string
  initialDesc: string
}

const TodoModal = ({
  title,
  initialDesc,
  onConfirm,
  onCancel,
}: TodoModalProps) => {
  const [desc, setDesc] = useState(initialDesc)

  const handleSubmit = () => {
    if (desc.trim() === '') return
    onConfirm(desc)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onCancel) {
      onCancel()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return (
    <div className='modal-backdrop' onClick={handleBackdropClick}>
      <div className='modal todo-modal' onClick={(e) => e.stopPropagation()}>
        <button className='modal-x-btn' onClick={onCancel}>
          x
        </button>
        <h1 className='modal-title'>{title}</h1>
        <EditTodoTextarea desc={desc} setDesc={setDesc} />
        <div className='modal-btns todo-modal-btns'>
          <button className='modal-btn green-btn' onClick={handleSubmit}>
            Submit
          </button>
          <button className='modal-btn red-btn' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoModal

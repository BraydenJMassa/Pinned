import '../styles/Modal.css'

type TodoModalProps = {
  onConfirm: () => void
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
  return (
    <div className='todo-modal'>
      <button className='modal-x-btn'>x</button>
      <h1>{title}</h1>
      <input type='text' className='todo-modal-input' value={initialDesc} />
      <button className='modal-btn red-btn' onClick={onCancel}>
        Cancel
      </button>
      <button className='modal-btn green-btn' onClick={onConfirm}>
        Submit
      </button>
    </div>
  )
}

export default TodoModal

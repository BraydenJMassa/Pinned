import '../styles/ConfirmationModal.css'

type CreateTodoModalProps = {
  initialDesc: string
}

const CreateTodoModal = ({ initialDesc }: CreateTodoModalProps) => {
  return (
    <div className='confirmation-modal'>
      <button className='modal-x-btn'>x</button>
      <h1>Edit Todo</h1>
      <input type='text' id='editInput' value={initialDesc} />
      <button className='modal-btn green-btn'>Submit</button>
    </div>
  )
}

export default CreateTodoModal

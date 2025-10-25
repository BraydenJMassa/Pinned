import { TodoType } from '../types/TodoType'
import editIcon from '../assets/edit.png'
import checkedCheckbox from '../assets/checked-checkbox.png'
import uncheckedCheckbox from '../assets/unchecked-checkbox.png'
import deleteIcon from '../assets/delete.png'
import '../styles/todo.css'
import { useState } from 'react'
import { useConfirmationModal } from '../hooks/useConfirmationModal'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

type Props = {
  todo: TodoType
}

const Todo = ({ todo }: Props) => {
  const { auth } = useAuth()
  const { openModal } = useConfirmationModal()
  const [isChecked, setIsChecked] = useState(false)

  const deleteTodo = async () => {
    await axios.delete(`/api/todo/${todo.todoId}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
  }

  const handleClickDelete = async () => {
    openModal({
      title: 'Are you sure you want to delete this Todo?',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: deleteTodo,
    })
  }
  const handleClickEdit = async () => {
    console.log('Edited')
  }
  const handleClickCheckbox = async () => {
    setIsChecked(!isChecked)
  }
  const checkboxImage = isChecked ? checkedCheckbox : uncheckedCheckbox
  return (
    <div className='todo'>
      {todo.description}
      <div className='todo-btns'>
        <img
          src={deleteIcon}
          className='todo-btn'
          alt='Delete'
          onClick={handleClickDelete}
        />
        <img
          src={editIcon}
          className='todo-btn'
          alt='Edit'
          onClick={handleClickEdit}
        />
        <img
          src={checkboxImage}
          className='todo-btn'
          alt='checked'
          onClick={handleClickCheckbox}
        />
        {/* {isChecked ? (
          <img src={checkedCheckbox} className='todo-btn' alt='checked' />
        ) : (
          <img src={uncheckedCheckbox} className='todo-btn' alt='unchecked' />
        )} */}
      </div>
    </div>
  )
}

export default Todo

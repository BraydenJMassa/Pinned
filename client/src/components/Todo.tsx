import { TodoType } from '../types/TodoType'
import editIcon from '../assets/edit.png'
import checkedCheckbox from '../assets/checked-checkbox.png'
import uncheckedCheckbox from '../assets/unchecked-checkbox.png'
import deleteIcon from '../assets/delete.png'
import '../styles/todo.css'
import '../styles/dashboard.css'
import { useState } from 'react'
import { useConfirmationModal } from '../hooks/useConfirmationModal'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

type Props = {
  todo: TodoType
  onUpdate: () => void
}

const Todo = ({ todo, onUpdate }: Props) => {
  const { auth } = useAuth()
  const { openModal } = useConfirmationModal()
  const [isChecked, setIsChecked] = useState(todo.completed)
  const [isLoading, setIsLoading] = useState(false)

  const deleteTodo = async () => {
    await axios.delete(`/api/todo/${todo.todoId}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
    onUpdate()
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
    const updatedChecked = !isChecked
    setIsChecked(updatedChecked)
    setIsLoading(true)
    try {
      await axios.patch(
        `api/todo/togglecompleted/${todo.todoId}`,
        { todo },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      onUpdate()
    } catch (err) {
      console.error('Error updating todo: ', err)
      setIsChecked(!updatedChecked)
    } finally {
      setIsLoading(false)
    }
  }
  const checkBoxImg = isChecked ? checkedCheckbox : uncheckedCheckbox
  return (
    <div className={isChecked ? 'todo completed' : 'todo'}>
      <div className='todo-desc'>{todo.description}</div>
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
          src={checkBoxImg}
          className='todo-btn'
          alt='checked'
          onClick={!isLoading ? handleClickCheckbox : undefined}
        />
      </div>
    </div>
  )
}

export default Todo

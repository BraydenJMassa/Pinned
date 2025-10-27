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
import { useTodoModal } from '../hooks/useTodoModal'

type Props = {
  todo: TodoType
  onUpdate: () => void
}

const Todo = ({ todo, onUpdate }: Props) => {
  const { auth } = useAuth()
  const { openConfirmationModal } = useConfirmationModal()
  const { openTodoModal } = useTodoModal()
  const [isChecked, setIsChecked] = useState(todo.completed)
  const [isLoading, setIsLoading] = useState(false)

  const handleClickDelete = () => {
    openConfirmationModal({
      title: 'Are you sure you want to delete this Todo?',
      onConfirm: deleteTodo,
    })
  }
  const deleteTodo = async () => {
    await axios.delete(`/api/todo/${todo.todoId}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
    onUpdate()
  }

  const handleClickEdit = () => {
    openTodoModal({
      title: 'Edit todo',
      initialDesc: todo.description,
      onConfirm: updateTodo,
    })
  }
  const updateTodo = async (desc: string) => {
    try {
      await axios.put(
        `/api/todo/${todo.todoId}`,
        { description: desc },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      onUpdate()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          'Error updating todo:',
          err.response?.data?.error || err.message
        )
      } else {
        console.error('Unexpected error:', err)
      }
    }
  }
  const handleClickCheckbox = async () => {
    const updatedChecked = !isChecked
    setIsChecked(updatedChecked)
    setIsLoading(true)
    try {
      await axios.patch(
        `/api/todo/togglecompleted/${todo.todoId}`,
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

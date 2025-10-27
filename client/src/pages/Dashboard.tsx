import { useEffect, useState } from 'react'
import axios, { isAxiosError } from 'axios'
import { TodoType } from '../types/TodoType'
import '../styles/dashboard.css'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useTodoModal } from '../hooks/useTodoModal'
import TodosList from '../components/TodosList'

const Dashboard = () => {
  const [todos, setTodos] = useState<undefined | TodoType[]>(undefined)
  const [todosError, setTodosError] = useState<undefined | string>(undefined)
  const { auth } = useAuth()
  const { openTodoModal } = useTodoModal()

  const handleClickAddTodo = () => {
    openTodoModal({
      title: 'Add Todo',
      initialDesc: '',
      onConfirm: createTodo,
    })
  }

  const createTodo = async (desc: string) => {
    try {
      await axios.post(
        'api/todo',
        { description: desc },
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
          withCredentials: true,
        }
      )
      await fetchTodos()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          'Error creating todo:',
          err.response?.data?.error || err.message
        )
      } else {
        console.error('Unexpected error:', err)
      }
    }
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`/api/user/todo/${auth.userId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      setTodos(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        setTodosError(
          err.response?.data.message || 'Unknown error loading todos'
        )
      }
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  if (todosError) {
    return <div className='dashboard todosError'>{todosError}</div>
  }
  if (!todos) {
    return (
      <div className='loading-container'>
        <div className='spinner' />
      </div>
    )
  }

  return (
    <div className='dashboard'>
      <Navbar />
      <main>
        <button className='create-todo-btn' onClick={handleClickAddTodo}>
          +
        </button>
        <TodosList todos={todos} onUpdate={fetchTodos} />
      </main>
    </div>
  )
}

export default Dashboard

import { useEffect, useState } from 'react'
import axios, { isAxiosError } from 'axios'
import { TodoType } from '../types/TodoType'
import '../styles/dashboard.css'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import Todo from '../components/Todo'
import { AnimatePresence, motion } from 'framer-motion'
import { useTodoModal } from '../hooks/useTodoModal'

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
    return <div className='dashboard loading'>Loading...</div>
  }

  const incompleteTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed)
  return (
    <div className='dashboard'>
      <Navbar />
      <main>
        <button className='create-todo-btn' onClick={handleClickAddTodo}>
          +
        </button>
        <div className='todos'>
          <AnimatePresence>
            {todos.length > 0 ? (
              <>
                {/* Incomplete Todos */}
                {incompleteTodos.map((todo) => (
                  <motion.div
                    key={todo.todoId}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Todo key={todo.todoId} todo={todo} onUpdate={fetchTodos} />
                  </motion.div>
                ))}

                {/* Divider only if completed todos exist */}
                {completedTodos.length > 0 && (
                  <div className='todo-divider'>Completed</div>
                )}

                {/* Completed Todos */}
                {completedTodos.map((todo) => (
                  <motion.div
                    key={todo.todoId}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Todo key={todo.todoId} todo={todo} onUpdate={fetchTodos} />
                  </motion.div>
                ))}
              </>
            ) : (
              <>You have no todos.</>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

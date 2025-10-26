import { useEffect, useState } from 'react'
import axios, { isAxiosError } from 'axios'
import { TodoType } from '../types/TodoType'
import '../styles/dashboard.css'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import Todo from '../components/Todo'
import { AnimatePresence, motion } from 'framer-motion'

const Dashboard = () => {
  const [todos, setTodos] = useState<undefined | TodoType[]>(undefined)
  const [todosError, setTodosError] = useState<undefined | string>(undefined)
  const { auth } = useAuth()

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

  return (
    <div className='dashboard'>
      <Navbar />
      <main>
        <button className='create-todo-btn'>+</button>
        <div className='todos'>
          <AnimatePresence>
            {todos.length > 0 ? (
              todos.map((todo) => (
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
              ))
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

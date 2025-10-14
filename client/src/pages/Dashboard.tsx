import { useEffect, useState } from 'react'
import axios, { isAxiosError } from 'axios'
import { TodoType } from '../types/TodoType'
import '../styles/dashboard.css'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import Todo from '../components/Todo'

const Dashboard = () => {
  const [todos, setTodos] = useState<undefined | TodoType[]>(undefined)
  const [todosError, setTodosError] = useState<undefined | string>(undefined)
  const { auth } = useAuth()

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`/api/user/todo/${auth.userId}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        console.log(response)
        setTodos(response.data)
      } catch (err) {
        console.log('here')
        if (isAxiosError(err)) {
          setTodosError(
            err.response?.data.message || 'Unknown error loading todos'
          )
        }
      }
    }
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
        <button className='create-todo-btn'>Create</button>
        <div className='todos'>
          {todos.length > 0 ? (
            todos.map((todo) => <Todo key={todo.todoId} todo={todo} />)
          ) : (
            <>You have no todos.</>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard

import { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TodoType } from '../types/TodoType'
import Todo from './Todo'

type TodoListProps = {
  todos: TodoType[]
  onUpdate: () => void
}

const TodosList = ({ todos, onUpdate }: TodoListProps) => {
  const todosRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = todosRef.current
    if (!el) {
      return
    }
    const scrollbarWidth = el.offsetWidth - el.clientWidth
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const isNearScrollbar = e.clientX >= rect.right - scrollbarWidth

      el.style.cursor = isNearScrollbar ? 'pointer' : 'default'
    }
    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const incompleteTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed)

  return (
    <div className='todos' ref={todosRef}>
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
                <Todo key={todo.todoId} todo={todo} onUpdate={onUpdate} />
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
                <Todo key={todo.todoId} todo={todo} onUpdate={onUpdate} />
              </motion.div>
            ))}
          </>
        ) : (
          <>You have no todos.</>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TodosList

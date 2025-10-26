import express from 'express'
const router = express.Router()

import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
} from '../controllers/todoController.js'
import checkTodoExists from '../middlewares/checkTodoExists.js'

// Create new todo
router.post('/', createTodo)
// Get all todos
router.get('/', getTodos)
// Get todo by todo_id
router.get('/:todoId', checkTodoExists, getTodo)
// Update todo description
router.put('/:todoId', checkTodoExists, updateTodo)
// Toggles the completed field
router.patch('/togglecompleted/:todoId', checkTodoExists, toggleComplete)
// Delete todo
router.delete('/:todoId', checkTodoExists, deleteTodo)

export default router

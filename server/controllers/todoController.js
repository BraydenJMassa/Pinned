import { sql } from '../database/dbConfig.js'

export const createTodo = async (req, res) => {
  const { description } = req.body
  const userId = req.token.userId
  if (!description) {
    return res.status(400).json({ error: 'Description must be provided' })
  }
  try {
    const [user] = await sql`SELECT * FROM users WHERE user_id = ${userId}`
    if (!user) {
      return res.status(404).json({ error: 'No user with specified user_id' })
    }
    const [newTodo] =
      await sql`INSERT INTO todos (user_id, description) VALUES (${userId}, ${description}) RETURNING *`
    res.status(201).json(newTodo)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getTodos = async (req, res) => {
  try {
    const todos = await sql`SELECT * FROM todos`
    res.status(200).json(todos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getTodo = async (req, res) => {
  return res.status(200).json(req.todo)
}

export const updateTodo = async (req, res) => {
  const todoId = req.todo.todoId
  const { description } = req.body
  if (!description) {
    return res
      .status(400)
      .json({ error: 'Description required to update todo' })
  }
  try {
    const [newTodo] =
      await sql`UPDATE todos SET description = ${description} WHERE todo_id = ${todoId} RETURNING *`
    return res.status(200).json(newTodo)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const deleteTodo = async (req, res) => {
  const todoId = req.todo.todoId
  try {
    await sql`DELETE FROM todos WHERE todo_id = ${todoId}`
    return res.status(200).json({})
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

import { sql } from '../database/dbConfig.js'

const checkTodoExists = async (req, res, next) => {
  const { todoId } = req.params
  if (!todoId) {
    return res.status(400).json({ error: 'todoId not found in params' })
  }
  try {
    const [todo] = await sql`SELECT * FROM todos WHERE todo_id = ${todoId}`
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    req.todo = todo
    next()
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export default checkTodoExists

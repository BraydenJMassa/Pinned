import { TodoType } from '../types/TodoType'

type Props = {
  todo: TodoType
}

const Todo = ({ todo }: Props) => {
  return (
    <div className='todo'>
      {todo.description}
      <div className='todo-btns'>
        <button>Edit</button>
        <button>Complete</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default Todo

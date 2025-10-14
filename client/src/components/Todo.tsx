import { TodoType } from '../types/TodoType'

type Props = {
  todo: TodoType
}

const Todo = ({ todo }: Props) => {
  return <div className='todo'>{todo.description}</div>
}

export default Todo

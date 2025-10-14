import { Link } from 'react-router-dom'
import '../styles/home.css'

const Home = () => {
  return (
    <div className='home-container'>
      <h1>Todo App</h1>
      <Link className='home-link' to='/register'>
        Register
      </Link>
      <Link className='home-link' to='/login'>
        Login
      </Link>
    </div>
  )
}

export default Home

import { Link } from 'react-router-dom'
import '../styles/home.css'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    document.title = 'Pinned'
  }, [])
  return (
    <div className='home-container'>
      <h1>Pinned</h1>
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

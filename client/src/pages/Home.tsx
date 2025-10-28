import { Link } from 'react-router-dom'
import '../styles/home.css'
import { useEffect } from 'react'

// Home page of application. Contains Login and Register links
const Home = () => {
  // Sets page title
  useEffect(() => {
    document.title = 'Pinned'
  }, [])

  // Home page markup
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

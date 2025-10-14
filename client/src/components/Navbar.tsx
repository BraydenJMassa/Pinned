import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import { useLogoutModal } from '../hooks/useLogoutModal'

const Navbar = () => {
  const { toggleLogoutModal } = useLogoutModal()
  return (
    <nav className='navbar'>
      <Link to='/dashboard' className='navbar-header'>
        Todo App
      </Link>
      <button onClick={() => toggleLogoutModal(true)} className='logout-btn'>
        Log out
      </button>
    </nav>
  )
}

export default Navbar

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
      <div className='navbar-links'>
        <Link className='navbar-link' to='/settings'>
          Settings
        </Link>
        <Link className='navbar-link' to='/profile'>
          Profile
        </Link>
        <button
          onClick={() => toggleLogoutModal(true)}
          className='navbar-link logout-btn'
        >
          Log out
        </button>
      </div>
    </nav>
  )
}

export default Navbar

import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import { useConfirmationModal } from '../hooks/useConfirmationModal'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { logout } = useAuth()
  const { openModal } = useConfirmationModal()

  const handleLogoutClick = () => {
    openModal({
      title: 'Are you sure you want to log out?',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: logout,
    })
  }
  return (
    <nav className='navbar'>
      <Link to='/dashboard' className='navbar-header'>
        Todo App
      </Link>
      <button onClick={handleLogoutClick} className='logout-btn'>
        Log out
      </button>
    </nav>
  )
}

export default Navbar

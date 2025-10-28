import { Link, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { useAuth } from '../hooks/useAuth'
import { useModal } from '../hooks/useModal'

// Custom navbar for dashboard page
const Navbar = () => {
  // Imports auth, modal, and navigation hooks
  const { logout } = useAuth()
  const { openModal } = useModal()
  const navigate = useNavigate()

  // Called when user clicks logout to open the modal. Modal logic takes place
  // in the ConfirmationModalProvider
  const handleLogoutClick = () => {
    openModal({
      type: 'confirmation',
      title: 'Are you sure you want to log out?',
      onConfirm: async () => {
        await logout()
        navigate('/')
      },
    })
  }
  // Navbar Markup
  return (
    <nav className='navbar'>
      <Link to='/dashboard' className='navbar-header'>
        Pinned
      </Link>
      <button onClick={handleLogoutClick} className='logout-btn'>
        Log out
      </button>
    </nav>
  )
}

export default Navbar

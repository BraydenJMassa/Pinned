import { useAuth } from '../hooks/useAuth'
import { useLogoutModal } from '../hooks/useLogoutModal'
import '../styles/LogoutModal.css'

const LogoutModal = () => {
  const { logout } = useAuth()
  const { toggleLogoutModal } = useLogoutModal()
  const handleLogout = () => {
    toggleLogoutModal(false)
    logout()
  }
  return (
    <div className='logout-modal'>
      <button className='logout-x-btn' onClick={() => toggleLogoutModal(false)}>
        x
      </button>
      <h1>Are you sure you want to logout?</h1>
      <div className='logout-modal-btns'>
        <button
          className='logout-modal-btn red-btn'
          onClick={() => toggleLogoutModal(false)}
        >
          No
        </button>
        <button className='logout-modal-btn green-btn' onClick={handleLogout}>
          Yes
        </button>
      </div>
    </div>
  )
}

export default LogoutModal

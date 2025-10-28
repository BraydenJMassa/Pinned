import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useConfirmationModal } from "../hooks/useConfirmationModal";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { logout } = useAuth();
  const { openConfirmationModal: openModal } = useConfirmationModal();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    openModal({
      title: "Are you sure you want to log out?",
      onConfirm: async () => {
        await logout();
        navigate("/");
      },
    });
  };
  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-header">
        Pinned
      </Link>
      <button onClick={handleLogoutClick} className="logout-btn">
        Log out
      </button>
    </nav>
  );
};

export default Navbar;

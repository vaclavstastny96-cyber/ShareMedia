import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/feed" className="navbar-logo">
          🎬 ShareMedia
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/feed" className="nav-link">Feed</Link>
          </li>
          <li className="nav-item">
            <Link to="/upload" className="nav-link">Upload</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
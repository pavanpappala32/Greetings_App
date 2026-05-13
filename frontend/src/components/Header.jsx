import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <h1 className="logo">ClassPlus</h1>
        <nav className="nav-links">
          <a href="/home">Home</a>
          {user && <a href="/profile">Profile</a>}
        </nav>
        <div className="user-menu">
          {user && (
            <>
              <span className="user-name">{user.name}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

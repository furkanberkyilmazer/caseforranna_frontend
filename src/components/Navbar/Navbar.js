import React from 'react';
import './Navbar.css';

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken(''); // Token'i temizle
    localStorage.removeItem('token'); // Token'i localStorage'a kaydet

  };

  // Token varsa, adı al
  const name = token ? JSON.parse(atob(token.split('.')[1])).name : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">My App</div>
        {token && (
          <div className="navbar-links">
            <span className="name">{name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
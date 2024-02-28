import React, { useState } from 'react';
import Register from '../Register/Register';
import './Navbar.css';



const Navbar = ({ token, setToken ,setSelected }) => {
  
  const name = token ? JSON.parse(atob(token.split('.')[1])).name : '';
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setSelected('Login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Ranna Case</div>
        {token && (
          <div className="navbar-links">
             <span className='name'>{name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!token && (
          <div className="navbar-links">
           <button onClick={() => setSelected('Customer')}>Customer Register</button>
          <button onClick={() => setSelected('Manager')}>Manager Register</button>
          <button onClick={() => setSelected('Login')}>Login</button>
          </div>
        )}
      </div>
      {/* {showCustomerRegister && (
        <div className="register-form">
          <h2>Customer Register</h2>
          <Register registerUrl="https://localhost:7028/api/Users/SaveCustomer" />
          <button onClick={() => setShowCustomerRegister(false)}>Close</button>
        </div>
      )}
      {showManagerRegister && (
        <div className="register-form">
          <h2>Manager Register</h2>
          <Register registerUrl="https://localhost:7028/api/Users/SaveManager" />
          <button onClick={() => setShowManagerRegister(false)}>Close</button>
        </div>
      )} */}
    </nav>
  );
};
export default Navbar;
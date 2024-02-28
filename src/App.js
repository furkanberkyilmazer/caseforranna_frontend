import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from './components/LoginForm/LoginForm';
import Navbar from './components/Navbar/Navbar';
import ManagerDashboard from './components/ManagerDashboard/ManagerDashboard';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import { jwtDecode } from 'jwt-decode';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Register from './components/Register/Register';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('str:'+storedToken);

    if (storedToken) {
      setToken(storedToken);
      const decodedToken = JSON.parse(atob(storedToken.split('.')[1])); // Base64 decode
      setRole(decodedToken.role.toLowerCase());
    }
  }, [token,role]);
  console.log("rol:"+role);

  let content;
  if (token) {
    if (role === 'manager') {
      content = <ManagerDashboard token={token}/>;
    } else if (role === 'customer') {
      content = <CustomerDashboard token={token}/>;
    } else {
      content = <div>Unknown role</div>;
    }
  } else {
    content = <LoginForm  setToken={setToken} />;
  }

  return (
    <div>
    <Navbar token={token} setToken={setToken}  setSelected={setSelected} />
    {token ? (
      role === 'manager' ? <ManagerDashboard token={token}/> : <CustomerDashboard token={token}/>
    ) : (
      selected === 'Login' || selected === null? 
      <LoginForm setToken={setToken} />:<Register selected={selected}/>
    )}
  </div>
  );
};

export default App;
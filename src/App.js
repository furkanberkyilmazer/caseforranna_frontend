import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from './components/LoginForm/LoginForm';
import Navbar from './components/Navbar/Navbar';
import ManagerDashboard from './components/ManagerDashboard/ManagerDashboard';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import { jwtDecode } from 'jwt-decode';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    // Token durumunu kontrol et
    const storedToken = localStorage.getItem('token');
    //const storedToken = token;  //local storage da tutmak istemezsen
    console.log('str:'+storedToken);

    if (storedToken) {
      setToken(storedToken);
      // Token varsa, decode ederek rol bilgisini al
      const decodedToken = JSON.parse(atob(storedToken.split('.')[1])); // Base64 decode
      setRole(decodedToken.role.toLowerCase());
    }
  }, [token,role]);
  console.log("rol:"+role);

  let content;
  if (token) {
    // Token varsa, role'e göre uygun bileşeni göster
    if (role === 'manager') {
      content = <ManagerDashboard token={token}/>;
    } else if (role === 'customer') {
      content = <CustomerDashboard token={token}/>;
    } else {
      // Rol belirlenemiyorsa veya bilinmeyen bir rol varsa hata mesajı göster
      content = <div>Unknown role</div>;
    }
  } else {
    // Token yoksa, giriş formunu göster
    content = <LoginForm  setToken={setToken} />;
  }

  return (
    <div>
    <Navbar token={token} setToken={setToken} />
    {token ? (
      // Token varsa, role'e göre uygun bileşeni göster
      role === 'manager' ? <ManagerDashboard token={token}/> : <CustomerDashboard token={token}/>
    ) : (
      // Token yoksa, giriş formunu göster
      <LoginForm setToken={setToken} />
    )}
  </div>
  );
};

export default App;
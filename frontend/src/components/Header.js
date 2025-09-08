import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    if (token) {
      setIsLoggedIn(true);
      if (adminStatus) {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
    window.location.reload();
  };

  return (
    <header style={{ padding: '1rem', backgroundColor: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Mi Tienda MERN</Link>
      </h1>
      <nav>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Productos</Link>
        {isAdmin && (
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Admin</Link>
        )}
        {!isLoggedIn ? (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        ) : (
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' }}>Salir</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
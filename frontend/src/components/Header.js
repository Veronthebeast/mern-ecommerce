import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link

const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Mi Tienda MERN</Link>
      </h1>
      <nav>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Productos</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
      </nav>
    </header>
  );
};

export default Header;
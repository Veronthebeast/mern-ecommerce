import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
      <p>&copy; {new Date().getFullYear()} Mi Tienda MERN</p>
    </footer>
  );
};

export default Footer;
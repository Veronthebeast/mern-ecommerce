import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main style={{ minHeight: '80vh', padding: '2rem 0' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
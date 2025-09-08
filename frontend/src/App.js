import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage'; // Importa la nueva página
import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente de protección

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main style={{ minHeight: '80vh', padding: '2rem 0' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Aquí protegemos la ruta del panel de administración */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute isAdminRequired={true}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
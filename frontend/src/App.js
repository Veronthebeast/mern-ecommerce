import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AddProductPage from './pages/AddProductPage';
import ProtectedRoute from './components/ProtectedRoute';
import EditProductPage from './pages/EditProductPage'; // <-- 1. Importa la nueva página

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
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute isAdminRequired={true}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-product" 
              element={
                <ProtectedRoute isAdminRequired={true}>
                  <AddProductPage />
                </ProtectedRoute>
              } 
            />
            {/* <-- 2. Añade la nueva ruta para editar productos */}
            <Route
              path="/admin/edit-product/:id"
              element={
                <ProtectedRoute isAdminRequired={true}>
                  <EditProductPage />
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

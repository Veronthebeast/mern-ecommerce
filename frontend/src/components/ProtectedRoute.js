import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdminRequired }) => {
  const token = localStorage.getItem('userToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!token || (isAdminRequired && !isAdmin)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
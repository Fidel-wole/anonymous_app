// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return token !== null; // Return true if a valid token is present
      };
  return isAuthenticated() ? element : <Navigate to="/" replace />;
}

export default ProtectedRoute;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if they try to access unauthorized page
    if(user.role === 'admin') return <Navigate to="/admin/dashboard" />;
    if(user.role === 'trainer') return <Navigate to="/trainer/dashboard" />;
    if(user.role === 'student') return <Navigate to="/student/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
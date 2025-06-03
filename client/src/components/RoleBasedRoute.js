import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleBasedRoute; 
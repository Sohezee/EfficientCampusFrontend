import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useContext(UserContext);

  return loggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

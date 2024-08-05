import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './auth-context';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps|any> = ({ children }) => {
  const { user } = useContext(UserContext);   


  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
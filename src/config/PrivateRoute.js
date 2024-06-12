import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, isTokenExpired } = useAuth();

  if (!isAuthenticated || isTokenExpired) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
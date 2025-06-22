import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RequireCustomer({ children }) {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (!isAuthenticated || user?.role !== 'customer') {
    return <Navigate to="/" />;
  }

  return children;
}

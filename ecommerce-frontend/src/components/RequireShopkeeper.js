import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RequireShopkeeper({ children }) {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (user?.role !== 'shopkeeper') {
    return (
      <div className="container mt-4">
        <h4 className="text-danger">Access Denied</h4>
        <p>Only shopkeepers can access this page.</p>
      </div>
    );
  }

  return children;
}

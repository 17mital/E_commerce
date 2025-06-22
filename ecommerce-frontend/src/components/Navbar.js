import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './Navbar.css';

export default function Navbar() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">🛍 MyShop</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>

          {!auth.isAuthenticated ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
            </>
          ) : (
            <>
              <li className="nav-item"><span className="nav-link">Hello, {auth.user?.name}</span></li>
              <li className="nav-item"><button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

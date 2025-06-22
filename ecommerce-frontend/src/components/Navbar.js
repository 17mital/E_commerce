import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './Navbar.css';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <nav className="navbar fixed-top bg-dark text-light">
        <div className="navbar-container">
          <div className="left-section">
          <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
          <Link className="navbar-brand" to="/">🛍 MyShop</Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {isAuthenticated && user?.role === 'customer' && (
              <>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </>
            )}
            {isAuthenticated && user?.role === 'shopkeeper' && (
              <li><Link to="/dashboard">Dashboard</Link></li>
            )}
            {!isAuthenticated ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            ) : (
              <>
                <li><span>Hello, {user?.name}</span></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </div> 
        </div>
      </nav>

      {/* Sidebar for small screens */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>✖</button>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          {isAuthenticated && user?.role === 'customer' && (
            <>
              <li><Link to="/cart" onClick={toggleSidebar}>Cart</Link></li>
              <li><Link to="/wishlist" onClick={toggleSidebar}>Wishlist</Link></li>
              <li><Link to="/profile" onClick={toggleSidebar}>Profile</Link></li>
            </>
          )}
          {isAuthenticated && user?.role === 'shopkeeper' && (
            <li><Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
          )}
          {!isAuthenticated ? (
            <>
              <li><Link to="/login" onClick={toggleSidebar}>Login</Link></li>
              <li><Link to="/signup" onClick={toggleSidebar}>Signup</Link></li>
            </>
          ) : (
            <>
              <li><span>Hello, {user?.name}</span></li>
              <li><button onClick={() => { handleLogout(); toggleSidebar(); }}>Logout</button></li>
            </>
          )}
        </ul>
      </div>

      {/* Optional: Backdrop behind sidebar */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={toggleSidebar}></div>}
    </>
  );
}

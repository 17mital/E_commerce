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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter products
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <>
      <nav className="modern-navbar">
        <div className="navbar-container">
          {/* Left Section */}
          <div className="navbar-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
            
            <Link className="navbar-brand" to="/">
              <div className="brand-icon">🛍️</div>
              <span className="brand-text">StyleHub</span>
            </Link>
          </div>

          {/* Center Section - Search */}
          {isAuthenticated && user?.role === 'customer' && (
            <div className="navbar-center">
              <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
                <form onSubmit={handleSearch} className="search-form">
                  <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search for products, brands, categories..."
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      onKeyPress={handleSearchKeyPress}
                    />
                    {searchQuery && (
                      <button 
                        type="button" 
                        className="clear-search"
                        onClick={() => setSearchQuery('')}
                      >
                        ✕
                      </button>
                    )}
                    <button type="submit" className="search-submit">
                      Search
                    </button>
                  </div>
                </form>
                
                {/* Search Suggestions */}
                {searchFocused && (
                  <div className="search-suggestions">
                    <div className="suggestion-category">
                      <h4>Popular Searches</h4>
                      <div className="suggestion-items">
                        <span className="suggestion-item">Electronics</span>
                        <span className="suggestion-item">Fashion</span>
                        <span className="suggestion-item">Books</span>
                        <span className="suggestion-item">Home & Garden</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="navbar-right">
            <ul className="nav-links">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  {/* <span className="nav-icon">🏠</span> */}
                  <span className="nav-text">Home</span>
                </Link>
              </li>
              
              {isAuthenticated && user?.role === 'customer' && (
                <>
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link cart-link">
                      <span className="nav-icon">🛒</span>
                      <span className="nav-text">Cart</span>
                      {/* <span className="cart-badge">3</span> */}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/wishlist" className="nav-link">
                      {/* <span className="nav-icon">❤️</span> */}
                      <span className="nav-text">Wishlist</span>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <div className="user-menu">
                      <div className="user-avatar">
                        <span>{user?.name?.charAt(0) || 'U'}</span>
                      </div>
                      <div className="user-info">
                        <span className="user-name">Hello, {user?.name}</span>
                        <span className="user-role">Customer</span>
                      </div>
                      <div className="dropdown-content">
                        <Link to="/profile" className="dropdown-item">
                          <span className="dropdown-icon">👤</span>
                          My Profile
                        </Link>
                        <Link to="/orders" className="dropdown-item">
                          <span className="dropdown-icon">📦</span>
                          My Orders
                        </Link>
                        <Link to="/support" className="dropdown-item">
                          <span className="dropdown-icon">🛠️</span>
                          Support
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button onClick={handleLogout} className="dropdown-item logout-btn">
                          <span className="dropdown-icon">🚪</span>
                          Logout
                        </button>
                      </div>
                    </div>
                  </li>
                </>
              )}
              
              {isAuthenticated && user?.role === 'shopkeeper' && (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <span className="nav-icon">📊</span>
                      <span className="nav-text">Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <div className="user-menu">
                      <div className="user-avatar shopkeeper">
                        <span>{user?.name?.charAt(0) || 'S'}</span>
                      </div>
                      <div className="user-info">
                        <span className="user-name">Hello, {user?.name}</span>
                        <span className="user-role">Shopkeeper</span>
                      </div>
                      <div className="dropdown-content">
                        <Link to="/add-product" className="dropdown-item">
                          <span className="dropdown-icon">➕</span>
                          Add Product
                        </Link>
                        <Link to="/dashboard" className="dropdown-item">
                          <span className="dropdown-icon">📊</span>
                          Dashboard
                        </Link>
                        <Link to="/support" className="dropdown-item">
                          <span className="dropdown-icon">🛠️</span>
                          Support
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button onClick={handleLogout} className="dropdown-item logout-btn">
                          <span className="dropdown-icon">🚪</span>
                          Logout
                        </button>
                      </div>
                    </div>
                  </li>
                </>
              )}
              
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link login-btn">
                      <span className="nav-icon">🔐</span>
                      <span className="nav-text">Login</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link signup-btn">
                      <span className="nav-icon">🎯</span>
                      <span className="nav-text">Sign Up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Modern Sidebar */}
      <div className={`modern-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">🛍️</div>
            <span className="brand-text">StyleHub</span>
          </div>
          <button className="close-btn" onClick={toggleSidebar}>
            <span className="close-icon">✕</span>
          </button>
        </div>

        <div className="sidebar-content">
          {/* Search in Sidebar for Mobile */}
          {isAuthenticated && user?.role === 'customer' && (
            <div className="sidebar-search">
              <form onSubmit={handleSearch} className="mobile-search-form">
                <div className="mobile-search-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="mobile-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="mobile-search-btn">Go</button>
                </div>
              </form>
            </div>
          )}

          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="/" onClick={toggleSidebar} className="sidebar-link">
                <span className="sidebar-icon">🏠</span>
                <span className="sidebar-text">Home</span>
              </Link>
            </li>
            
            {isAuthenticated && user?.role === 'customer' && (
              <>
                <li className="sidebar-item">
                  <Link to="/cart" onClick={toggleSidebar} className="sidebar-link">
                    <span className="sidebar-icon">🛒</span>
                    <span className="sidebar-text">Cart</span>
                    {/* <span className="sidebar-badge">3</span> */}
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/wishlist" onClick={toggleSidebar} className="sidebar-link">
                    <span className="sidebar-icon">❤️</span>
                    <span className="sidebar-text">Wishlist</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/profile" onClick={toggleSidebar} className="sidebar-link">
                    <span className="sidebar-icon">👤</span>
                    <span className="sidebar-text">Profile</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/support" onClick={toggleSidebar} className="sidebar-link">
                    <span className="sidebar-icon">🛠️</span>
                    <span className="sidebar-text">Support</span>
                  </Link>
                </li>
              </>
            )}
            
            {isAuthenticated && user?.role === 'shopkeeper' && (
              <>
                <li className="sidebar-item">
                  <Link to="/dashboard" onClick={toggleSidebar} className="sidebar-link">
                    <span className="sidebar-icon">📊</span>
                    <span className="sidebar-text">Dashboard</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/add-product" onClick={toggleSidebar} className="sidebar-link">
                    <span className="sidebar-icon">➕</span>
                    <span className="sidebar-text">Add Product</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/support" onClick={toggleSidebar} className="sidebar-link">
                    <span className="sidebar-icon">🛠️</span>
                    <span className="sidebar-text">Support</span>
                  </Link>
                </li>
              </>
            )}
            
            {!isAuthenticated ? (
              <>
                <li className="sidebar-item">
                  <Link to="/login" onClick={toggleSidebar} className="sidebar-link">
                    <span className="sidebar-icon">🔐</span>
                    <span className="sidebar-text">Login</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/signup" onClick={toggleSidebar} className="sidebar-link">
                    <span className="sidebar-icon">🎯</span>
                    <span className="sidebar-text">Sign Up</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <div className="sidebar-divider"></div>
                <li className="sidebar-item user-info-mobile">
                  <div className="mobile-user-card">
                    <div className="mobile-user-avatar">
                      <span>{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                    <div className="mobile-user-details">
                      <span className="mobile-user-name">{user?.name}</span>
                      <span className="mobile-user-role">{user?.role}</span>
                    </div>
                  </div>
                </li>
                <li className="sidebar-item">
                  <button 
                    onClick={() => { handleLogout(); toggleSidebar(); }} 
                    className="sidebar-link logout-mobile"
                  >
                    <span className="sidebar-icon">🚪</span>
                    <span className="sidebar-text">Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Backdrop */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={toggleSidebar}></div>}
    </>
  );
}

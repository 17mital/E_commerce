import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ShopkeeperDashboard.css';
import { fetchMyProducts, deleteProduct } from '../services/api';

export default function ShopkeeperDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔁 Reusable Fetch Function
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchMyProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetching products:", err.response?.data || err.message);
      alert(err.response?.data?.error || 'Something went wrong fetching your products.');
    } finally {
      setLoading(false);
    }
  };

  // 🗑 Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      alert('Product deleted!');
      fetchProducts(); // Refresh list after deletion
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  // 🚀 Initial Load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Logged-in user ID:", user?._id);
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const inStock = products.filter(p => p.inStock).length;
  const outOfStock = totalProducts - inStock;
  const totalValue = products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="shopkeeper-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="welcome-section">
              <h1 className="dashboard-title">
                <span className="icon">🛍️</span>
                Shopkeeper Dashboard
              </h1>
              <p className="dashboard-subtitle">Manage your products and track your business performance</p>
            </div>
            <div className="header-actions">
              <Link to="/add-product" className="add-product-btn">
                <span className="btn-icon">+</span>
                Add New Product
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Analytics Cards */}
        <div className="analytics-section">
          <div className="analytics-grid">
            <div className="analytics-card total-products">
              <div className="card-icon">
                <span>📦</span>
              </div>
              <div className="card-content">
                <h3 className="card-number">{totalProducts}</h3>
                <p className="card-label">Total Products</p>
                <div className="card-trend positive">
                  <span className="trend-icon">↗</span>
                  <span className="trend-text">+12% from last month</span>
                </div>
              </div>
            </div>

            <div className="analytics-card in-stock">
              <div className="card-icon">
                <span>✅</span>
              </div>
              <div className="card-content">
                <h3 className="card-number">{inStock}</h3>
                <p className="card-label">In Stock</p>
                <div className="card-trend positive">
                  <span className="trend-icon">↗</span>
                  <span className="trend-text">Good inventory</span>
                </div>
              </div>
            </div>

            <div className="analytics-card out-of-stock">
              <div className="card-icon">
                <span>⚠️</span>
              </div>
              <div className="card-content">
                <h3 className="card-number">{outOfStock}</h3>
                <p className="card-label">Out of Stock</p>
                <div className="card-trend negative">
                  <span className="trend-icon">↘</span>
                  <span className="trend-text">Needs attention</span>
                </div>
              </div>
            </div>

            <div className="analytics-card total-value">
              <div className="card-icon">
                <span>💰</span>
              </div>
              <div className="card-content">
                <h3 className="card-number">₹{totalValue.toLocaleString()}</h3>
                <p className="card-label">Total Inventory Value</p>
                <div className="card-trend positive">
                  <span className="trend-icon">↗</span>
                  <span className="trend-text">+8% growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon">📊</div>
              <h3>View Analytics</h3>
              <p>Check your sales performance</p>
              <button className="action-btn">View Reports</button>
            </div>
            <div className="action-card">
              <div className="action-icon">🏪</div>
              <h3>Manage Store</h3>
              <p>Update store information</p>
              <button className="action-btn">Manage Store</button>
            </div>
            <div className="action-card">
              <div className="action-icon">📋</div>
              <h3>Orders</h3>
              <p>View and manage orders</p>
              <button className="action-btn">View Orders</button>
            </div>
            <div className="action-card">
              <div className="action-icon">💬</div>
              <h3>Customer Support</h3>
              <p>Handle customer queries</p>
              <button className="action-btn">Support Center</button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="products-section">
          <div className="section-header">
            <h2 className="section-title">Your Products</h2>
            <div className="section-filters">
              <select className="filter-select">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
              </select>
              <select className="filter-select">
                <option>All Status</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No products found</h3>
              <p>Start by adding your first product to get started!</p>
              <Link to="/add-product" className="empty-action-btn">
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(prod => (
                <div className="product-card" key={prod._id}>
                  <div className="product-image-container">
                    <img
                      src={prod.image || "/placeholder.svg"}
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }}
                      className="product-image"
                      alt={prod.name}
                    />
                    <div className="product-status">
                      <span className={`status-badge ${prod.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {prod.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{prod.name}</h3>
                    <div className="product-price">₹{prod.price}</div>
                    <div className="product-details">
                      <span className="product-category">{prod.category}</span>
                      <span className="product-store">{prod.address}</span>
                    </div>
                  </div>

                  <div className="product-actions">
                    <button 
                      onClick={() => navigate(`/edit-product/${prod._id}`)} 
                      className="action-btn edit-btn"
                    >
                      <span className="btn-icon">✏️</span>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(prod._id)} 
                      className="action-btn delete-btn"
                    >
                      <span className="btn-icon">🗑️</span>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import ProductCard from "../components/ProductCard"
import "./Wishlist.css"

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist")
      setWishlist(res.data)
    } catch (err) {
      console.error("Failed to load wishlist:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await API.delete(`/wishlist/${productId}`)
      setWishlist(wishlist.filter((item) => item._id !== productId))
      alert("✅ Removed from wishlist")
    } catch (err) {
      alert("❌ Error removing from wishlist")
    }
  }

  const handleMoveAllToCart = () => {
    // Logic to move all wishlist items to cart
    alert("🛒 All items moved to cart!")
  }

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      // Logic to clear wishlist
      setWishlist([])
      alert("🗑️ Wishlist cleared!")
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your wishlist...</p>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="container">
          <div className="header-content">
            <div className="header-info">
              <h1 className="page-title">
                <span className="title-icon">❤️</span>
                My Wishlist
              </h1>
              <p className="page-subtitle">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
              </p>
            </div>
            {wishlist.length > 0 && (
              <div className="header-actions">
                <button className="action-btn move-all-btn" onClick={handleMoveAllToCart}>
                  <span className="btn-icon">🛒</span>
                  Move All to Cart
                </button>
                <button className="action-btn clear-btn" onClick={handleClearWishlist}>
                  <span className="btn-icon">🗑️</span>
                  Clear Wishlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="wishlist-container">
          {wishlist.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-wishlist-animation">
                <div className="heart-container">
                  <div className="broken-heart">💔</div>
                </div>
              </div>
              <div className="empty-content">
                <h2 className="empty-title">Your wishlist is empty</h2>
                <p className="empty-message">
                  Looks like you haven't added any products to your wishlist yet. Start browsing and save your favorite
                  items!
                </p>
                <div className="empty-actions">
                  <button className="browse-btn" onClick={() => navigate("/")}>
                    <span className="btn-icon">🛍️</span>
                    Start Shopping
                  </button>
                  <button className="categories-btn" onClick={() => navigate("/")}>
                    <span className="btn-icon">📂</span>
                    Browse Categories
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="wishlist-stats">
                <div className="stats-card">
                  <div className="stat-item">
                    <span className="stat-icon">❤️</span>
                    <div className="stat-info">
                      <span className="stat-number">{wishlist.length}</span>
                      <span className="stat-label">Saved Items</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">💰</span>
                    <div className="stat-info">
                      <span className="stat-number">
                        ₹{wishlist.reduce((total, item) => total + (item.price || 0), 0).toLocaleString()}
                      </span>
                      <span className="stat-label">Total Value</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🏷️</span>
                    <div className="stat-info">
                      <span className="stat-number">
                        {Math.round(
                          wishlist.reduce((total, item) => total + (item.price || 0), 0) * 0.2,
                        ).toLocaleString()}
                      </span>
                      <span className="stat-label">Potential Savings</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wishlist-filters">
                <div className="filter-section">
                  <h3 className="filter-title">
                    <span className="filter-icon">🔍</span>
                    Filter & Sort
                  </h3>
                  <div className="filter-controls">
                    <select className="filter-select">
                      <option value="">All Categories</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="books">Books</option>
                      <option value="home">Home & Garden</option>
                    </select>
                    <select className="filter-select">
                      <option value="">Sort by</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name A-Z</option>
                    </select>
                    <select className="filter-select">
                      <option value="">Price Range</option>
                      <option value="0-1000">Under ₹1,000</option>
                      <option value="1000-5000">₹1,000 - ₹5,000</option>
                      <option value="5000-10000">₹5,000 - ₹10,000</option>
                      <option value="10000+">Above ₹10,000</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="wishlist-products">
                <div className="products-grid">
                  {wishlist.map((product) => (
                    <div key={product._id} className="wishlist-product-wrapper">
                      <div className="wishlist-product-card">
                        <button
                          className="remove-wishlist-btn"
                          onClick={() => handleRemoveFromWishlist(product._id)}
                          title="Remove from wishlist"
                        >
                          <span className="remove-icon">❌</span>
                        </button>
                        
                        <ProductCard product={product} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="wishlist-actions-bottom">
                <div className="actions-card">
                  <div className="actions-content">
                    <h3 className="actions-title">Quick Actions</h3>
                    <p className="actions-subtitle">Manage your wishlist items efficiently</p>
                    <div className="actions-buttons">
                      <button className="action-btn share-btn">
                        <span className="btn-icon">📤</span>
                        Share Wishlist
                      </button>
                      <button className="action-btn save-btn">
                        <span className="btn-icon">💾</span>
                        Save for Later
                      </button>
                      <button className="action-btn compare-btn">
                        <span className="btn-icon">⚖️</span>
                        Compare Items
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

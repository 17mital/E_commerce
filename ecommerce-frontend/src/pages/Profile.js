"use client"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"
import "./Profile.css"

export default function Profile() {
  const { user } = useSelector((state) => state.auth)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("orders")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await API.get("/order/my-orders")
      setOrders(res.data)
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "success"
      case "shipped":
        return "info"
      case "processing":
        return "warning"
      default:
        return "primary"
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              <span>{user?.name?.charAt(0) || "U"}</span>
            </div>
            <div className="profile-details">
              <h1 className="profile-name">Welcome, {user?.name}!</h1>
              <p className="profile-email">{user?.email}</p>
              <div className="profile-badge">
                <span className="badge-icon">👤</span>
                {user?.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="sidebar-menu">
              <button
                className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <span className="menu-icon">📦</span>
                My Orders
              </button>
              <button
                className={`menu-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <span className="menu-icon">👤</span>
                Profile Info
              </button>
              <button
                className={`menu-item ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <span className="menu-icon">⚙️</span>
                Settings
              </button>
            </div>
          </div>

          <div className="profile-content">
            {activeTab === "orders" && (
              <div className="orders-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">📦</span>
                    Your Orders
                  </h2>
                  <div className="orders-stats">
                    <span className="stat-item">
                      <span className="stat-number">{orders.length}</span>
                      <span className="stat-label">Total Orders</span>
                    </span>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="no-orders">
                    <div className="no-orders-icon">📦</div>
                    <h3>No orders yet</h3>
                    <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
                    <Link to="/" className="shop-now-btn">
                      <span className="btn-icon">🛍️</span>
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order, idx) => (
                      <div className="order-card" key={idx}>
                        <div className="order-header">
                          <div className="order-info">
                            <h3 className="order-id">Order #{order._id?.slice(-8)}</h3>
                            <p className="order-date">
                              {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="order-status">
                            <span className={`status-badge ${getStatusColor("processing")}`}>
                              Processing
                            </span>
                          </div>
                        </div>

                        <div className="order-summary">
                          <div className="summary-item">
                            <span className="summary-label">Total Amount:</span>
                            <span className="summary-value">₹{order.amount?.toLocaleString()}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Payment Method:</span>
                            <span className="summary-value">{order.paymentMethod}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Payment Status:</span>
                            <span className={`payment-status ${order.isPaid ? "paid" : "pending"}`}>
                              {order.isPaid ? "✅ Paid" : "❌ Pending"}
                            </span>
                          </div>
                        </div>

                        <div className="order-address">
                          <h4>Delivery Address:</h4>
                          <p>{order.customer?.address || "Address not available"}</p>
                        </div>

                        <div className="order-products">
                          <h4>Items Ordered:</h4>
                          <div className="products-list">
                            {order.products?.map((item, i) => (
                              <div key={i} className="product-item">
                                <div className="product-info">
                                  <span className="product-name">
                                    {item.productId?.name || "Product no longer available"}
                                  </span>
                                  <span className="product-quantity">Qty: {item.quantity}</span>
                                </div>
                                <div className="product-price">
                                  ₹{item.productId?.price ? (item.productId.price * item.quantity).toLocaleString() : "N/A"}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="order-actions">
                          <Link to="/support" className="action-btn cancel-btn">
                            <span className="btn-icon">❌</span>
                            Cancel Order
                          </Link>
                          <Link to="/support" className="action-btn exchange-btn">
                            <span className="btn-icon">🔄</span>
                            Request Exchange
                          </Link>
                          <button className="action-btn track-btn">
                            <span className="btn-icon">📍</span>
                            Track Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="profile-info-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">👤</span>
                    Profile Information
                  </h2>
                </div>

                <div className="info-card">
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Full Name:</label>
                      <span>{user?.name}</span>
                    </div>
                    <div className="info-item">
                      <label>Email Address:</label>
                      <span>{user?.email}</span>
                    </div>
                    <div className="info-item">
                      <label>Account Type:</label>
                      <span className="role-badge">{user?.role}</span>
                    </div>
                    <div className="info-item">
                      <label>Member Since:</label>
                      <span>January 2024</span>
                    </div>
                  </div>

                  <div className="edit-profile-btn">
                    <button className="primary-btn">
                      <span className="btn-icon">✏️</span>
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="settings-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-icon">⚙️</span>
                    Account Settings
                  </h2>
                </div>

                <div className="settings-card">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Email Notifications</h4>
                      <p>Receive updates about your orders and promotions</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>SMS Notifications</h4>
                      <p>Get text messages for order updates</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Marketing Emails</h4>
                      <p>Receive promotional offers and deals</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="danger-zone">
                    <h4>Danger Zone</h4>
                    <p>Permanently delete your account and all data</p>
                    <button className="danger-btn">
                      <span className="btn-icon">🗑️</span>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

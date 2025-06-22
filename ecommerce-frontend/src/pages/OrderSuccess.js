"use client"

import { useNavigate } from "react-router-dom"
import "./OrderSuccess.css"

export default function OrderSuccess() {
  const navigate = useNavigate()

  return (
    <div className="order-success-page">
      <div className="success-container">
        <div className="success-animation">
          <div className="checkmark-circle">
            <div className="checkmark">✓</div>
          </div>
        </div>

        <div className="success-content">
          <h1 className="success-title">🎉 Order Confirmed!</h1>
          <p className="success-message">
            Thank you for your purchase! Your order has been successfully placed and is being processed.
          </p>

          <div className="order-details">
            <div className="detail-item">
              <span className="detail-icon">📧</span>
              <span>Confirmation email sent</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📦</span>
              <span>Order will be shipped within 2-3 business days</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🚚</span>
              <span>Track your order in your profile</span>
            </div>
          </div>

          <div className="success-actions">
            <button className="primary-btn" onClick={() => navigate("/profile")}>
              <span className="btn-icon">👤</span>
              View Orders
            </button>
            <button className="secondary-btn" onClick={() => navigate("/")}>
              <span className="btn-icon">🛍️</span>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

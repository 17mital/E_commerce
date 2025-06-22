"use client"

import { useSelector, useDispatch } from "react-redux"
import { incrementQty, decrementQty, removeFromCart } from "../redux/slices/productSlice"
import { useNavigate } from "react-router-dom"
import "./Cart.css"

export default function Cart() {
  const cart = useSelector((state) => state.product.cart || [])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  const handleRemoveItem = (id) => {
    if (window.confirm("Remove this item from cart?")) {
      dispatch(removeFromCart(id))
    }
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="container">
          <h1 className="page-title">
            <span className="title-icon">🛒</span>
            Shopping Cart
          </h1>
          <p className="page-subtitle">{cart.length} items in your cart</p>
        </div>
      </div>

      <div className="container">
        <div className="cart-container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet</p>
              <button className="continue-shopping-btn" onClick={() => navigate("/")}>
                <span className="btn-icon">🛍️</span>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-section">
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={index}>
                      <div className="item-image">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      </div>

                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-category">{item.category}</p>
                        <div className="item-price">₹{item.price?.toLocaleString()}</div>
                      </div>

                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() => dispatch(decrementQty(item._id))}
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span className="qty-display">{item.qty}</span>
                        <button className="qty-btn" onClick={() => dispatch(incrementQty(item._id))}>
                          +
                        </button>
                      </div>

                      <div className="item-total">
                        <div className="total-price">₹{(item.price * item.qty)?.toLocaleString()}</div>
                        <button className="remove-btn" onClick={() => handleRemoveItem(item._id)}>
                          <span className="remove-icon">🗑️</span>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cart-summary-section">
                <div className="cart-summary">
                  <h3 className="summary-title">
                    <span className="summary-icon">📋</span>
                    Order Summary
                  </h3>

                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Subtotal ({cart.length} items):</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span className="free">Free</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax:</span>
                      <span>₹{Math.round(total * 0.18).toLocaleString()}</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total-row">
                      <span>Total:</span>
                      <span>₹{Math.round(total * 1.18).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="checkout-actions">
                    <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                      <span className="btn-icon">🚀</span>
                      Proceed to Checkout
                    </button>
                    <button className="continue-shopping-btn" onClick={() => navigate("/")}>
                      <span className="btn-icon">🛍️</span>
                      Continue Shopping
                    </button>
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

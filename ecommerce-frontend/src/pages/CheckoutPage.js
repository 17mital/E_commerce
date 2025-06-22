"use client"

import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import { removeFromCart } from "../redux/slices/productSlice"
import "./CheckoutPage.css"

export default function CheckoutPage() {
  const cart = useSelector((state) => state.product.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("COD")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    if (paymentMethod === "Online") {
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded) {
        alert("❌ Failed to load Razorpay SDK")
        setLoading(false)
        return
      }
      await initiateRazorpayPayment()
    } else {
      await placeCODOrder()
    }
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const placeCODOrder = async () => {
    try {
      const res = await API.post("/order/checkout", {
        customer,
        cartItems: cart,
        paymentMethod: "COD",
        totalAmount: total,
      })

      alert("✅ Order placed successfully (COD)")
      cart.forEach((item) => dispatch(removeFromCart(item._id)))
      navigate("/order-success")
    } catch (err) {
      console.error("❌ COD order failed:", err)
      alert("❌ Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  const initiateRazorpayPayment = async () => {
    try {
      const { data: order } = await API.post("/payment/create-order", {
        amount: total,
      })

      const options = {
        key: "rzp_test_PSxfWBLAFb5ShC",
        amount: order.amount,
        currency: "INR",
        name: "Ecom Store",
        description: "Test Order",
        order_id: order.id,
        handler: async function (response) {
          try {
            await API.post("/order/checkout", {
              customer,
              cartItems: cart,
              paymentMethod: "Online",
              totalAmount: total,
            })

            alert("✅ Payment successful & order placed!")
            cart.forEach((item) => dispatch(removeFromCart(item._id)))
            navigate("/")
          } catch (err) {
            alert("❌ Order failed after payment")
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: {
          color: "#667eea",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error("❌ Razorpay Error:", err)
      alert("❌ Razorpay error")
      setLoading(false)
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="container">
          <h1 className="page-title">
            <span className="title-icon">🛒</span>
            Checkout
          </h1>
          <p className="page-subtitle">Complete your order</p>
        </div>
      </div>

      <div className="container">
        <div className="checkout-container">
          <div className="checkout-form-section">
            <div className="form-card">
              <h2 className="section-title">
                <span className="section-icon">👤</span>
                Customer Details
              </h2>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">👤</span>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={customer.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📧</span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={customer.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📱</span>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Enter your phone number"
                    value={customer.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    <span className="label-icon">📍</span>
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    className="form-input form-textarea"
                    placeholder="Enter your complete delivery address"
                    value={customer.address}
                    onChange={handleChange}
                    rows="4"
                    required
                  />
                </div>
              </div>

              <div className="payment-section">
                <h3 className="payment-title">
                  <span className="section-icon">💳</span>
                  Payment Method
                </h3>

                <div className="payment-options">
                  <div className="payment-option">
                    <input
                      className="payment-radio"
                      type="radio"
                      name="paymentMethod"
                      id="cod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="cod" className="payment-label">
                      <div className="payment-info">
                        <span className="payment-icon">💵</span>
                        <div>
                          <h4>Cash on Delivery</h4>
                          <p>Pay when you receive your order</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="payment-option">
                    <input
                      className="payment-radio"
                      type="radio"
                      name="paymentMethod"
                      id="online"
                      value="Online"
                      checked={paymentMethod === "Online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="online" className="payment-label">
                      <div className="payment-info">
                        <span className="payment-icon">💳</span>
                        <div>
                          <h4>Online Payment</h4>
                          <p>Pay securely with card/UPI/wallet</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Place Order - ₹{total.toLocaleString()}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="order-summary-section">
            <div className="summary-card">
              <h2 className="section-title">
                <span className="section-icon">📋</span>
                Order Summary
              </h2>

              <div className="cart-items">
                {cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-quantity">Qty: {item.qty}</p>
                    </div>
                    <div className="item-price">₹{(item.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span className="free">Free</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

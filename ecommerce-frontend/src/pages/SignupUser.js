"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "./AuthForm.css"

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    storeName: "",
  })
  const [showStoreForm, setShowStoreForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

    if (e.target.name === "role") {
      setShowStoreForm(e.target.value === "shopkeeper")
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post("https://e-commerce-bssm.onrender.com/api/auth/signup", form)
      alert("Signup successful!")
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">
              <span className="auth-icon">🎉</span>
              Create Account
            </h1>
            <p className="auth-subtitle">Join our community and start shopping</p>
          </div>

          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                type="text"
                className="form-input"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
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
                className="form-input"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">👥</span>
                Account Type
              </label>
              <div className="role-selection">
                <div className="role-option">
                  <input
                    type="radio"
                    name="role"
                    id="customer"
                    value="customer"
                    checked={form.role === "customer"}
                    onChange={handleChange}
                    className="role-radio"
                  />
                  <label htmlFor="customer" className="role-label">
                    <div className="role-info">
                      <span className="role-icon">🛍️</span>
                      <div>
                        <h4>Customer</h4>
                        <p>Shop and buy products</p>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="role-option">
                  <input
                    type="radio"
                    name="role"
                    id="shopkeeper"
                    value="shopkeeper"
                    checked={form.role === "shopkeeper"}
                    onChange={handleChange}
                    className="role-radio"
                  />
                  <label htmlFor="shopkeeper" className="role-label">
                    <div className="role-info">
                      <span className="role-icon">🏪</span>
                      <div>
                        <h4>Shopkeeper</h4>
                        <p>Sell your products</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {showStoreForm && (
              <div className="form-group store-form">
                <label className="form-label">
                  <span className="label-icon">🏪</span>
                  Store Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  name="storeName"
                  placeholder="Enter your store name"
                  value={form.storeName}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span className="btn-icon">🎯</span>
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  )
}

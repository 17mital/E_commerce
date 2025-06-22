"use client"

import { useState } from "react"
import "./Support.css"

export default function Support() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("medium")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      alert("📬 Your request has been submitted. Our team will contact you soon.")
      setQuery("")
      setCategory("")
      setPriority("medium")
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="support-page">
      <div className="support-header">
        <div className="container">
          <h1 className="page-title">
            <span className="title-icon">🛠️</span>
            Customer Support
          </h1>
          <p className="page-subtitle">We're here to help! Get in touch with our support team</p>
        </div>
      </div>

      <div className="container">
        <div className="support-container">
          <div className="support-form-section">
            <div className="form-card">
              <h2 className="form-title">
                <span className="form-icon">📝</span>
                Submit a Support Request
              </h2>

              <form onSubmit={handleSubmit} className="support-form">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📂</span>
                    Category
                  </label>
                  <select
                    className="form-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="order">Order Issues</option>
                    <option value="payment">Payment Problems</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="product">Product Questions</option>
                    <option value="account">Account Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">⚡</span>
                    Priority Level
                  </label>
                  <div className="priority-options">
                    <label className="priority-option">
                      <input
                        type="radio"
                        name="priority"
                        value="low"
                        checked={priority === "low"}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                      <span className="priority-label low">
                        <span className="priority-icon">🟢</span>
                        Low
                      </span>
                    </label>
                    <label className="priority-option">
                      <input
                        type="radio"
                        name="priority"
                        value="medium"
                        checked={priority === "medium"}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                      <span className="priority-label medium">
                        <span className="priority-icon">🟡</span>
                        Medium
                      </span>
                    </label>
                    <label className="priority-option">
                      <input
                        type="radio"
                        name="priority"
                        value="high"
                        checked={priority === "high"}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                      <span className="priority-label high">
                        <span className="priority-icon">🔴</span>
                        High
                      </span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">💬</span>
                    Describe your issue
                  </label>
                  <textarea
                    className="form-textarea"
                    rows="6"
                    placeholder="Please provide detailed information about your issue..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                </div>

                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">📤</span>
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="support-info-section">
            <div className="info-card">
              <h3 className="info-title">
                <span className="info-icon">📞</span>
                Contact Information
              </h3>
              <div className="contact-methods">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <h4>Email Support</h4>
                    <p>support@ecomstore.com</p>
                    <span className="response-time">Response within 24 hours</span>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <div>
                    <h4>Phone Support</h4>
                    <p>+1 (555) 123-4567</p>
                    <span className="response-time">Mon-Fri, 9 AM - 6 PM</span>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">💬</span>
                  <div>
                    <h4>Live Chat</h4>
                    <p>Available on website</p>
                    <span className="response-time">Mon-Fri, 9 AM - 6 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faq-card">
              <h3 className="faq-title">
                <span className="faq-icon">❓</span>
                Frequently Asked Questions
              </h3>
              <div className="faq-list">
                <div className="faq-item">
                  <h4>How can I track my order?</h4>
                  <p>You can track your order in the "My Orders" section of your profile.</p>
                </div>
                <div className="faq-item">
                  <h4>What is your return policy?</h4>
                  <p>We offer 30-day returns for most items in original condition.</p>
                </div>
                <div className="faq-item">
                  <h4>How long does shipping take?</h4>
                  <p>Standard shipping takes 3-5 business days, express shipping takes 1-2 days.</p>
                </div>
                <div className="faq-item">
                  <h4>Can I cancel my order?</h4>
                  <p>Orders can be cancelled within 1 hour of placement if not yet shipped.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

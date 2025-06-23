"use client"

import { Link } from "react-router-dom" // or just use <a> tags

import { useState } from "react"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Music } from "lucide-react"
import "./Footer.css"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: "Electronics", path: "/category/electronics" },
      { name: "Fashion", path: "/category/fashion" },
      { name: "Books", path: "/category/books" },
      { name: "Home & Garden", path: "/category/home" },
      { name: "Sports", path: "/category/sports" },
      { name: "Beauty", path: "/category/beauty" },
    ],
    support: [
      { name: "Help Center", path: "/support" },
      { name: "Contact Us", path: "/contact" },
      { name: "Track Order", path: "/track-order" },
      { name: "Returns", path: "/returns" },
      { name: "Shipping Info", path: "/shipping" },
      { name: "Size Guide", path: "/size-guide" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Press", path: "/press" },
      { name: "Sustainability", path: "/sustainability" },
      { name: "Investor Relations", path: "/investors" },
      { name: "Affiliate Program", path: "/affiliate" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Accessibility", path: "/accessibility" },
      { name: "Security", path: "/security" },
      { name: "Compliance", path: "/compliance" },
    ],
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com", color: "#1877f2" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com", color: "#1da1f2" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com", color: "#e4405f" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com", color: "#0077b5" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com", color: "#ff0000" },
    { name: "TikTok", icon: Music, url: "https://tiktok.com", color: "#000000" },
  ]

  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "PayPal", icon: "💰" },
    { name: "Apple Pay", icon: "📱" },
    { name: "Google Pay", icon: "📱" },
    { name: "Stripe", icon: "💳" },
  ]

  return (
    <footer className="modern-footer">
      {/* Decorative Elements */}
      <div className="footer-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-info">
              <h2 className="newsletter-title">
                <span className="newsletter-icon">📧</span>
                Stay in the Loop
              </h2>
              <p className="newsletter-subtitle">
                Get exclusive deals, new arrivals, and insider updates delivered straight to your inbox.
              </p>
              <div className="newsletter-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">🎁</span>
                  <span>Exclusive Offers</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">⚡</span>
                  <span>Early Access</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📱</span>
                  <span>Mobile Alerts</span>
                </div>
              </div>
            </div>
            <div className="newsletter-form-container">
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <div className="input-group">
                  <input color="black"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-btn" disabled={subscribed}>
                    {subscribed ? (
                      <>
                        <span className="success-icon">✓</span>
                        Subscribed!
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">→</span>
                        Subscribe
                      </>
                    )}
                  </button>
                </div>
                <p className="newsletter-disclaimer">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <div className="logo-icon">🛍️</div>
                <span className="logo-text">StyleHub</span>
              </Link>
              <p className="brand-description">
                Your ultimate destination for premium products, exceptional service, and unbeatable prices. Discover a
                world of possibilities with StyleHub.
              </p>
              <div className="brand-stats">
                <div className="stat-item">
                  <span className="stat-number">1M+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div className="footer-section">
              <h3 className="section-title">
                <span className="section-icon">🛒</span>
                Shop
              </h3>
              <ul className="footer-links">
                {footerLinks.shop.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="footer-section">
              <h3 className="section-title">
                <span className="section-icon">🛠️</span>
                Support
              </h3>
              <ul className="footer-links">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="footer-section">
              <h3 className="section-title">
                <span className="section-icon">🏢</span>
                Company
              </h3>
              <ul className="footer-links">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="footer-section">
              <h3 className="section-title">
                <span className="section-icon">📞</span>
                Connect
              </h3>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div className="contact-details">
                    <span className="contact-label">Email</span>
                    <a href="mailto:support@stylehub.com" className="contact-value">
                      support@stylehub.com
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <div className="contact-details">
                    <span className="contact-label">Phone</span>
                    <a href="tel:+1234567890" className="contact-value">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div className="contact-details">
                    <span className="contact-label">Address</span>
                    <span className="contact-value">123 Commerce St, Business District, NY 10001</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="social-section">
                <h4 className="social-title">Follow Us</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        style={{ "--social-color": social.color } }
                        title={social.name}
                      >
                        <IconComponent className="social-icon" size={20} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p className="copyright">© {currentYear} StyleHub. All rights reserved.</p>
              <div className="legal-links">
                {footerLinks.legal.map((link, index) => (
                  <Link key={index} href={link.path} className="legal-link">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="footer-bottom-right">
              <div className="payment-section">
                <span className="payment-label">We Accept:</span>
                <div className="payment-methods">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="payment-method" title={method.name}>
                      <span className="payment-icon">{method.icon}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="security-badges">
                <div className="security-badge">
                  <span className="security-icon">🔒</span>
                  <span className="security-text">SSL Secured</span>
                </div>
                <div className="security-badge">
                  <span className="security-icon">✓</span>
                  <span className="security-text">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Back to top"
      >
        <span className="back-to-top-icon">↑</span>
      </button>
    </footer>
  )
}

"use client"

import { useState, useEffect } from "react"
import { addProduct } from "../services/api"
import "./AddProduct.css"

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    address: "",
    inStock: true,
    available: true,
  })
  const [isShopkeeper, setIsShopkeeper] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState("")

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"))
    if (userData?.role === "shopkeeper") {
      setIsShopkeeper(true)
    } else {
      alert("Only shopkeepers can access this page.")
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === "checkbox" ? checked : value })

    // Update image preview
    if (name === "image" && value) {
      setImagePreview(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addProduct(form)
      alert("Product added successfully!")
      setForm({
        name: "",
        category: "",
        price: "",
        image: "",
        address: "",
        inStock: true,
        available: true,
      })
      setImagePreview("")
    } catch (err) {
      console.error("Add product error:", err.response?.data || err.message || err)
      alert(err.response?.data?.error || "Error adding product")
    } finally {
      setLoading(false)
    }
  }

  if (!isShopkeeper) return null

  return (
    <div className="add-product-page">
      <div className="add-product-header">
        <div className="container">
          <h1 className="page-title">
            <span className="title-icon">📦</span>
            Add New Product
          </h1>
          <p className="page-subtitle">Create a new product listing for your store</p>
        </div>
      </div>

      <div className="container">
        <div className="add-product-container">
          <div className="form-section">
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">🏷️</span>
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    name="name"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📂</span>
                    Category
                  </label>
                  <select className="form-input" name="category" value={form.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Sports">Sports</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Toys">Toys</option>
                    <option value="Food">Food</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">💰</span>
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    name="price"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">🖼️</span>
                    Image URL
                  </label>
                  <input
                    type="url"
                    className="form-input"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    <span className="label-icon">📍</span>
                    Store Address
                  </label>
                  <textarea
                    className="form-input form-textarea"
                    name="address"
                    placeholder="Enter your store address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="form-group full-width">
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        name="inStock"
                        id="inStock"
                        checked={form.inStock}
                        onChange={handleChange}
                      />
                      <label htmlFor="inStock" className="checkbox-label">
                        <span className="checkbox-icon">✅</span>
                        In Stock
                      </label>
                    </div>

                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        name="available"
                        id="available"
                        checked={form.available}
                        onChange={handleChange}
                      />
                      <label htmlFor="available" className="checkbox-label">
                        <span className="checkbox-icon">🟢</span>
                        Available for Sale
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">➕</span>
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="preview-section">
            <div className="preview-card">
              <h3 className="preview-title">Product Preview</h3>
              <div className="product-preview">
                <div className="preview-image">
                  {imagePreview ? (
                    <img src={imagePreview || "/placeholder.svg"} alt="Product preview" onError={(e) => (e.target.src = "/placeholder.svg")} />
                  ) : (
                    <div className="placeholder-image">
                      <span className="placeholder-icon">🖼️</span>
                      <p>Image Preview</p>
                    </div>
                  )}
                </div>
                <div className="preview-details">
                  <h4 className="preview-name">{form.name || "Product Name"}</h4>
                  <p className="preview-category">{form.category || "Category"}</p>
                  <p className="preview-price">₹{form.price || "0.00"}</p>
                  <div className="preview-status">
                    <span className={`status-badge ${form.inStock ? "in-stock" : "out-of-stock"}`}>
                      {form.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

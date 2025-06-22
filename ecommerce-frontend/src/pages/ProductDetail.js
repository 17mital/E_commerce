"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/slices/productSlice"
import API from "../services/api"
import "./ProductDetail.css"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [imageFile, setImageFile] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    fetchProductAndReviews()
  }, [id])

  const fetchProductAndReviews = async () => {
    try {
      const productRes = await API.get(`/products/${id}`)
      setProduct(productRes.data)

      const reviewsRes = await API.get(`/reviews/${id}`)
      setReviews(reviewsRes.data)
    } catch (err) {
      console.error("Error loading product or reviews:", err)
    }
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: quantity }))
    alert("✅ Added to cart!")
  }

  const handleAddToWishlist = async () => {
    try {
      await API.post(`/wishlist/${product._id}`)
      alert("✅ Added to wishlist")
    } catch (err) {
      alert("❌ Error adding to wishlist")
    }
  }

  const handleReviewSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append("rating", newReview.rating)
      formData.append("comment", newReview.comment)
      if (imageFile) {
        formData.append("image", imageFile)
      }

      await API.post(`/reviews/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      alert("✅ Review submitted")
      setNewReview({ rating: 5, comment: "" })
      setImageFile(null)
      fetchProductAndReviews()
    } catch (err) {
      alert(err.response?.data?.error || "❌ Review submission failed")
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ⭐
      </span>
    ))
  }

  if (!product) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    )
  }

  // Mock additional images for gallery
  const productImages = [product.image, product.image, product.image, product.image]

  return (
    <div className="product-detail-page">
      <div className="product-detail-header">
        <div className="container">
          <div className="header-content">
            <div className="header-info">
              <h1 className="page-title">
                <span className="title-icon">📦</span>
                Product Details
              </h1>
              <p className="page-subtitle">Detailed information about this product</p>
            </div>
            <div className="header-actions">
              <button className="action-btn back-btn" onClick={() => navigate(-1)}>
                <span className="btn-icon">←</span>
                Go Back
              </button>
              <button className="action-btn share-btn">
                <span className="btn-icon">📤</span>
                Share Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="product-detail-container">
          {/* Product Images Section */}
          <div className="product-images-section">
            <div className="main-image-container">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="main-product-image"
                onError={(e) => (e.target.src = "/placeholder.svg")}
              />
              <div className="image-badges">
                <span className="new-badge">NEW</span>
                {product.inStock && <span className="stock-badge">In Stock</span>}
              </div>
            </div>

            <div className="image-gallery">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`gallery-thumb ${selectedImage === index ? "active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-info-section">
            <div className="product-header">
              <div className="product-category">{product.category}</div>
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                <div className="stars">{renderStars(4)}</div>
                <span className="rating-text">(4.0) 156 reviews</span>
              </div>
            </div>

            <div className="product-price-section">
              <div className="current-price">₹{product.price?.toLocaleString()}</div>
              <div className="original-price">₹{(product.price * 1.2)?.toLocaleString()}</div>
              <div className="discount-badge">20% OFF</div>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description || "High-quality product with excellent features and durability."}</p>
            </div>

            <div className="seller-info">
              <h4>Seller Information</h4>
              <div className="seller-details">
                <span className="seller-icon">🏪</span>
                <div>
                  <p className="seller-name">{product.shopkeeperId?.name || product.shopkeeperId?.email}</p>
                  <p className="seller-rating">⭐ 4.5 (1.2k reviews)</p>
                </div>
              </div>
            </div>

            {user?.role === "customer" && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="qty-display">{quantity}</span>
                    <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    <span className="btn-icon">🛒</span>
                    Add to Cart
                  </button>
                  <button className="wishlist-btn" onClick={handleAddToWishlist}>
                    <span className="btn-icon">❤️</span>
                    Wishlist
                  </button>
                  <button className="buy-now-btn" onClick={() => navigate(`/checkout?productId=${product._id}`)}>
                    <span className="btn-icon">⚡</span>
                    Buy Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <div className="reviews-header">
            <h2 className="section-title">
              <span className="section-icon">⭐</span>
              Customer Reviews
            </h2>
            <div className="reviews-summary">
              <div className="average-rating">
                <span className="rating-number">4.0</span>
                <div className="rating-stars">{renderStars(4)}</div>
                <span className="total-reviews">Based on {reviews.length} reviews</span>
              </div>
            </div>
          </div>

          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map((rev, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        <span>{rev.user?.name?.charAt(0) || "U"}</span>
                      </div>
                      <div className="reviewer-details">
                        <h4 className="reviewer-name">{rev.user?.name || "Anonymous User"}</h4>
                        <div className="review-rating">{renderStars(rev.rating)}</div>
                      </div>
                    </div>
                    <div className="review-date">{new Date().toLocaleDateString()}</div>
                  </div>
                  <div className="review-content">
                    <p>{rev.comment}</p>
                    {rev.imageUrl && (
                      <div className="review-image">
                        <img src={`http://localhost:5000/${rev.imageUrl}`} alt="Review" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-reviews">
                <span className="no-reviews-icon">📝</span>
                <h3>No reviews yet</h3>
                <p>Be the first to review this product!</p>
              </div>
            )}
          </div>

          {/* Write Review Form */}
          {isAuthenticated && user?.role === "customer" && (
            <div className="write-review-section">
              <h3 className="review-form-title">
                <span className="form-icon">✍️</span>
                Write a Review
              </h3>
              <div className="review-form">
                <div className="rating-selector">
                  <label>Your Rating:</label>
                  <div className="star-selector">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${newReview.rating >= star ? "active" : ""}`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>

                <div className="comment-section">
                  <label>Your Review:</label>
                  <textarea
                    className="review-textarea"
                    placeholder="Share your experience with this product..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows="4"
                  />
                </div>

                <div className="image-upload">
                  <label>Add Photo (Optional):</label>
                  <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>

                <button className="submit-review-btn" onClick={handleReviewSubmit}>
                  <span className="btn-icon">📤</span>
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

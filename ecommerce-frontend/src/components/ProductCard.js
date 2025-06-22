"use client"

import { Link } from "react-router-dom"
import { useSelector, useDispatch  } from "react-redux"
import { addToWishlist } from "../services/api"
import { addToCart } from "../redux/slices/productSlice"
import "./ProductCard.css"

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const quantity = 1; // Default quantity for add to cart

  const handleWishlist = async () => {
    try {
      await addToWishlist(product._id);
      alert("Added to wishlist");
    } catch (err) {
      alert("Error adding to wishlist");
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: quantity }));
    alert("✅ Added to cart!");
  };

  // Calculate discount percentage (mock logic)
  const originalPrice = product.price * 1.2; // Assuming 20% markup
  const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="modern-product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
          className="product-image"
          alt={product.name}
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && <div className="discount-badge">{discountPercentage}% OFF</div>}

        {/* Wishlist Button */}
        {isAuthenticated && user?.role === "customer" && (
          <button className="wishlist-btn" onClick={handleWishlist}>
            <span className="heart-icon">🤍</span>
          </button>
        )}

        {/* Quick View Overlay */}
        <div className="quick-view-overlay">
          <Link to={`/product/${product._id}`} className="quick-view-btn">
            Quick View
          </Link>
        </div>
      </div>

      <div className="product-details">
        {/* Brand/Store Name */}
        {product.storeName && <div className="product-brand">{product.storeName}</div>}

        {/* Product Name */}
        <h3 className="product-title">{product.name}</h3>

        {/* Rating Stars (Mock data) */}
        <div className="product-rating">
          <div className="stars">
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star">★</span>
          </div>
          <span className="rating-count">(4.2) 156 reviews</span>
        </div>

        {/* Price Section */}
        <div className="price-section">
          <div className="current-price">₹{product.price.toLocaleString()}</div>
          {discountPercentage > 0 && (
            <div className="original-price">₹{originalPrice.toLocaleString()}</div>
          )}
        </div>

        {/* Category */}
        {product.category && <div className="product-category-tag">{product.category}</div>}

        {/* Stock Status */}
        <div className={`stock-status ${product.inStock ? "in-stock" : "out-of-stock"}`}>
          {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <Link to={`/product/${product._id}`} className="view-details-btn">
            View Details
          </Link>

          {product.inStock && (
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <span className="cart-icon">🛒</span>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client"

import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { fetchAllProducts } from "../services/api"
import "./home.css"
export default function Home() {
  const [products, setProducts] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  // Sample slider images - replace with your actual images
  const sliderImages = [
    {
      url: "/images/background1.jpg",
      buttonText: "Shop Now",
    },
    {
      url: "/images/background2.jpg",
      buttonText: "View Deals",
    },
    {
      url: "/images/background3.jpg",
      buttonText: "Explore",
    },
  ]

  // Shopping quotes data - limited to 3
  const shoppingQuotes = [
    {
      quote: "Fashion is about dressing according to what's fashionable. Style is more about being yourself.",
      author: "Oscar de la Renta",
      category: "Fashion",
    },
    {
      quote: "Shopping is cheaper than therapy and you get something out of it.",
      author: "Anonymous",
      category: "Lifestyle",
    },
    {
      quote: "Style is a way to say who you are without having to speak.",
      author: "Rachel Zoe",
      category: "Expression",
    },
  ]

  // Customer testimonials - limited to 3
  const customerReviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing quality products! Fast delivery and excellent customer service. Highly recommended!",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "New York, USA",
      verified: true,
      purchaseDate: "2 weeks ago",
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Love the variety of products. The website is easy to navigate and checkout process is smooth.",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Toronto, Canada",
      verified: true,
      purchaseDate: "1 month ago",
    },
    {
      name: "Emma Wilson",
      rating: 4,
      comment: "Great shopping experience! The products arrived exactly as described. Will shop again!",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "London, UK",
      verified: true,
      purchaseDate: "3 weeks ago",
    },
  ]

  useEffect(() => {
    fetchAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)
    return () => clearInterval(slideInterval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ))
  }

  return (
    <div className="homepage">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        <div className="slider-container">
          {sliderImages.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.url})` }}
            >
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <button className="slide-button">{slide.buttonText}</button>
              </div>
            </div>
          ))}

          <button className="slider-btn prev-btn" onClick={prevSlide}>
            &#8249;
          </button>
          <button className="slider-btn next-btn" onClick={nextSlide}>
            &#8250;
          </button>

          <div className="slider-dots">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Discover our handpicked selection of amazing products</p>
          </div>
          <div className="products-grid">
            {products.slice(0, 8).map((prod) => (
              <div key={prod._id} className="product-item">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
         
        </div>
      </section>

      {/* Shopping Quotes Section */}
      <section className="shopping-quotes">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Style Inspiration</h2>
            <p className="section-subtitle">Words that inspire our fashion journey</p>
          </div>
          <div className="quotes-grid">
            {shoppingQuotes.map((item, index) => (
              <div key={index} className="quote-card">
                <div className="quote-category">{item.category}</div>
                <blockquote className="quote-text">"{item.quote}"</blockquote>
                <div className="quote-footer">
                  <cite className="quote-author">— {item.author}</cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="customer-reviews">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from real customers around the world</p>
            <div className="reviews-stats">
              <div className="stat-item">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </div>
          <div className="reviews-grid">
            {customerReviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      <img src={review.avatar || "/placeholder.svg"} alt={review.name} />
                      {review.verified && <div className="verified-badge">✓</div>}
                    </div>
                    <div className="reviewer-details">
                      <h4 className="reviewer-name">{review.name}</h4>
                      <p className="reviewer-location">{review.location}</p>
                      <span className="purchase-date">{review.purchaseDate}</span>
                    </div>
                  </div>
                  <div className="review-rating">
                    <div className="stars">{renderStars(review.rating)}</div>
                    <span className="rating-number">{review.rating}.0</span>
                  </div>
                </div>
                <div className="review-content">
                  <p className="review-comment">"{review.comment}"</p>
                </div>
                <div className="review-footer">
                  <div className="helpful-section">
                    <button className="helpful-btn">Helpful</button>
                    <span className="helpful-count">12 people found this helpful</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

    </div>
  )
}

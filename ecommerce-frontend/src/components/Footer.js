import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light">
      <div className="footer-content">
        <div className="footer-section">
          <h5>MyShop</h5>
          <p>Your favorite online shopping destination for quality and value.</p>
        </div>
        <div className="footer-section">
          <h6>Help</h6>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="footer-section">
          <h6>Policy</h6>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/return">Return Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MyShop. All Rights Reserved.
      </div>
    </footer>
  );
}

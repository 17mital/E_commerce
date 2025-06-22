import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5>{product.name}</h5>
        <p>${product.price}</p>
        <Link to={`/product/${product._id}`} className="btn btn-primary">View</Link>
      </div>
    </div>
  );
}

import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products') // connect to backend
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Products</h2>
      <div className="row">
        {products.map(prod => (
          <div key={prod._id} className="col-md-4 mb-3">
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </div>
  );
}

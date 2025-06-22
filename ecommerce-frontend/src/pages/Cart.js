import { useSelector } from 'react-redux';
import './Cart.css';

export default function Cart() {
  const cart = useSelector(state => state.product.cart || []);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty</p> :
        <>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li className="list-group-item d-flex justify-content-between" key={index}>
                <div>{item.name} x {item.qty}</div>
                <div>${item.price * item.qty}</div>
              </li>
            ))}
          </ul>
          <h4 className="mt-3">Total: ${total}</h4>
          <button className="btn btn-primary">Proceed to Checkout</button>
        </>
      }
    </div>
  );
}

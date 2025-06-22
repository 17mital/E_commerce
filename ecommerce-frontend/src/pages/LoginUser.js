import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/');
    } catch (err) {
      alert(err || 'Login failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="w-50">
        <input type="email" className="form-control mb-2" placeholder="Email"
               value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Password"
               value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}

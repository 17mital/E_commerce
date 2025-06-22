import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signupUser(form)).unwrap();
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      alert(err || 'Signup failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="w-50">
        <input type="text" className="form-control mb-2" placeholder="Name"
               name="name" value={form.name} onChange={handleChange} required />
        <input type="email" className="form-control mb-2" placeholder="Email"
               name="email" value={form.email} onChange={handleChange} required />
        <input type="password" className="form-control mb-2" placeholder="Password"
               name="password" value={form.password} onChange={handleChange} required />
        <button className="btn btn-success" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}

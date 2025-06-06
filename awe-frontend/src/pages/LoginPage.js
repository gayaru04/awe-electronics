import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost/awe-backend/auth/login.php', { email, password });
      if (res.data.success) {
        localStorage.setItem('role', res.data.role);
        setMessage('✅ Login successful');
        setTimeout(() => {
          navigate(res.data.role === 'admin' ? '/admin' : '/products');
        }, 500);
      } else {
        setMessage(
          res.data.message === 'Invalid credentials'
            ? 'Incorrect email or password.'
            : res.data.message || 'Login failed'
        );
      }
    } catch (error) {
      console.error("Login request failed:", error);
      toast.warning('Login error');
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Segoe UI, Inter, system-ui, sans-serif',
        backgroundImage: "url('/images/image3.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      
      <style>
        {`
          .login-page {
            padding: 2rem;
            font-family: 'Segoe UI', Inter, system-ui, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .login-form {
            background: #fff;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
          }
          .login-form h2 {
            text-align: center;
            margin-bottom: 1.5rem;
            color: #333;
          }
          .login-form input {
            width: 93%;
            margin-bottom: 1rem;
            padding: 0.75rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .login-form button {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
          }
          .login-form button:hover {
            background-color: #0056b3;
          }
          .message {
            margin-top: 1rem;
            text-align: center;
            color: green;
          }
          .register-link {
            text-align: center;
            margin-top: 1rem;
            color: black;
          }
        `}
      </style>

      <div className="login-page">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {message && <p className="message">{message}</p>}
          <div className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;


import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }
    try {
      const res = await axios.post('http://localhost/awe-backend/auth/register.php', {
        email,
        password,
        role
      });
      if (res.data.success) {
        setMessage('✅ Registered successfully. Redirecting to login...');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage('❌ ' + res.data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage('❌ Registration error');
    }
  };

  const handleGuest = () => {
    localStorage.setItem('role', 'guest');
    localStorage.setItem('email', 'guest@guest.com');
    navigate('/products');
  };

  return (
    <div
      style={{
        fontFamily: 'Segoe UI, Inter, system-ui, sans-serif',
        backgroundImage: "url('/images/image2.png')",
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
      }}>
      <style>
        {`
          .register-page {
            padding: 2rem;
            font-family: 'Segoe UI', Inter, system-ui, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .register-form {
            background: #fff;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
          }
          .register-form h2 {
            text-align: center;
            margin-bottom: 1.5rem;
            color: #333;
          }
          .register-form input, .register-form select {
            width: 93%;
            margin-bottom: 1rem;
            padding: 0.75rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
            
          .register-form button {
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
          .register-form button:hover {
            background-color: #0056b3;
          }
          .message {
            margin-top: 1rem;
            text-align: center;
            color: green;
          }
        `}
      </style>

      <div className="register-page">
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Register</h2>
          <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} required />
          <select
  value={role}
  onChange={e => setRole(e.target.value)}
  style={{
    width: '100%',
    marginBottom: '1rem',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px'
  }}
  required
>
  <option value="" disabled>Select a role</option>
  <option value="customer">Customer</option>
  <option value="admin">Admin</option>
</select>


          <button type="submit">Register</button>
          <button type="button" onClick={handleGuest} style={{ marginTop: '1rem', backgroundColor: '#28a745' }}>Continue as Guest</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole(null);
    navigate('/login');
  };

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, [location]); // 👈 update whenever route changes

  return (
    <>
      <style>
        {`
          .navbar {
            display: flex;
            gap: 1rem;
            width: 100%;
            background-color: #f0f0f0;
            padding: 1rem 2rem;
            font-family: 'Segoe UI', Inter, system-ui, sans-serif;
          }

          .nav-link {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            padding: 0.4rem 0.75rem;
            border-radius: 4px;
            transition: background-color 0.2s;
          }

          .nav-link:hover {
            background-color: #007bff;
            color: white;
          }

          .logout-button {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.4rem 0.75rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
          }

          .logout-button:hover {
            background-color: #b52a37;
          }
        `}
      </style>

      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link">Cart</Link>

        {!role && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}

        {role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}

        {role && <button className="logout-button" onClick={handleLogout}>Logout</button>}
      </nav>
    </>
  );
}

export default Navbar;

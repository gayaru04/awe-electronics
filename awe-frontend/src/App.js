import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />       
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;



import { useState } from 'react';
import CartItem from '../components/CartItem';

function CartPage() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:8000/cart/checkout.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
      });
      const data = await res.json();
      setMessage(data.message || 'Checkout complete');
      setCart([]);
      localStorage.removeItem('cart');
    } catch {
      setMessage('Checkout error');
    }
  };

  return (
    <>
      <style>
        {`
          .cart-page {
            padding: 2rem;
            font-family: 'Segoe UI', Inter, system-ui, sans-serif;
            background-color: #f9f9f9;
            min-height: 100vh;
          }

          .cart-page h2 {
            text-align: center;
            font-size: 2rem;
            color: #333;
            margin-bottom: 2rem;
          }

          .cart-list {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }

          .checkout-btn {
            display: block;
            margin: 2rem auto 0;
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 0.75rem 2rem;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .checkout-btn:hover {
            background-color: #0056b3;
          }

          .message {
            text-align: center;
            margin-top: 1rem;
            color: green;
            font-weight: 500;
          }
        `}
      </style>

      <div className="cart-page">
        <h2>Your Cart</h2>
        <div className="cart-list">
          {cart.length > 0 ? (
            cart.map((item, i) => <CartItem key={i} item={item} />)
          ) : (
            <p style={{ textAlign: 'center', color: '#666' }}>Your cart is empty.</p>
          )}
        </div>

        {cart.length > 0 && (
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
}

export default CartPage;

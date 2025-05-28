import { useState, useEffect } from 'react';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  const fetchCartFromBackend = async () => {
    const email = localStorage.getItem('email');
    if (!email) return;

    try {
      const res = await fetch('http://localhost/awe-backend/cart/get_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (data.success) {
        setCart(data.items);
        localStorage.setItem('cart', JSON.stringify(data.items));
      }
    } catch (err) {
      console.error("Failed to fetch cart from backend");
    }
  };

  useEffect(() => {
    fetchCartFromBackend(); // 🟢 load cart from backend on page load
  }, []);

  const handleCheckout = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      setMessage('You must be logged in to checkout');
      return;
    }

    try {
      const res = await fetch('http://localhost/awe-backend/cart/checkout.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items: cart
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`Checkout successful! Order ID: ${data.orderId}`);
        setCart([]);
        localStorage.removeItem('cart');
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage('Checkout error');
    }
  };

  const handleRemove = async (index) => {
    const email = localStorage.getItem('email');
    if (!email) return;

    try {
      const res = await fetch('http://localhost/awe-backend/cart/remove_from_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, index })
      });

      const data = await res.json();
      if (data.success) {
        await fetchCartFromBackend(); // 🟢 re-sync with backend after delete
        setMessage('Item removed successfully');
      } else {
        setMessage(data.message || 'Remove failed');
      }
    } catch {
      setMessage('Remove error');
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

          .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
          }

          .remove-btn {
            background-color: #dc3545;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 0.3rem 0.7rem;
            cursor: pointer;
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
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.name} - ${item.price}</span>
                <button className="remove-btn" onClick={() => handleRemove(index)}>Remove</button>
              </div>
            ))
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

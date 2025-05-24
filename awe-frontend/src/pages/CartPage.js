
import React, { useState } from "react";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    const res = await fetch("http://localhost/backend/cart/checkout.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart)
    });
    const data = await res.json();
    setMessage(data.success ? "✅ " + data.message : "❌ " + data.message);
    if (data.success) setCart([]);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> :
        cart.map((item, idx) => (
          <div key={idx}>
            <p>{item.name} - ${item.price}</p>
          </div>
        ))
      }
      <button onClick={handleCheckout}>Checkout</button>
      <p>{message}</p>
    </div>
  );
}

export default CartPage;

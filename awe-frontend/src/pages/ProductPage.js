import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/awe-backend/products/get_products.php')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = async (product) => {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('You must be logged in to add items');
      return;
    }

    try {
      await fetch('http://localhost/awe-backend/cart/add_to_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, item: product })
      });

      // Optional: update localStorage for immediate cart rendering
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [...currentCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      alert('Added to cart!');
    } catch (err) {
      console.error('Add to cart failed', err);
      alert('Failed to add to cart');
    }
  };

  return (
    <>
      <style>
        {`
          .product-page {
            padding: 2rem;
            font-family: 'Segoe UI', Inter, system-ui, sans-serif;
            background-color: #f9f9f9;
            min-height: 100vh;
          }

          .product-page h2 {
            text-align: center;
            font-size: 2rem;
            color: #333;
            margin-bottom: 2rem;
          }

          .product-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
          }
        `}
      </style>

      <div className="product-page">
        <h2>Products</h2>
        <div className="product-grid">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} onAdd={handleAddToCart} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductPage;

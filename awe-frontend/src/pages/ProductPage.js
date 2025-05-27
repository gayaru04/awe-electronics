import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/products/get_products.php')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
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
            <ProductCard key={idx} product={product} onAdd={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductPage;

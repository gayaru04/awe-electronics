
import React, { useEffect, useState } from "react";

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/products/get_products.php")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div>
        {products.map((product, idx) => (
          <div key={idx}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;

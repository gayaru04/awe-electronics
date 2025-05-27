function ProductCard({ product, onAdd }) {
  return (
    <>
      <style>
        {`
          .product-card {
            width: 260px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            transition: transform 0.2s ease;
            font-family: 'Segoe UI', Inter, system-ui, sans-serif;
          }

          .product-card:hover {
            transform: translateY(-4px);
          }

          .product-card h3 {
            margin-top: 0;
            font-size: 1.2rem;
            color: #333;
          }

          .product-card p {
            margin: 0.5rem 0;
            color: #555;
          }

          .product-card button {
            margin-top: 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.3s ease;
          }

          .product-card button:hover {
            background-color: #0056b3;
          }
        `}
      </style>

      <div className="product-card">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button onClick={() => onAdd(product)}>Add to Cart</button>
      </div>
    </>
  );
}

export default ProductCard;

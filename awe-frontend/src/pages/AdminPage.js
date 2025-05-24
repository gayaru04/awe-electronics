
import React, { useState, useEffect } from "react";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost/backend/products/get_products.php")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAdd = async () => {
    const res = await fetch("http://localhost/backend/products/add_product.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price })
    });
    const data = await res.json();
    alert(data.message);
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin - Manage Products</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={handleAdd}>Add Product</button>
      <ul>
        {products.map((product, idx) => (
          <li key={idx}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;

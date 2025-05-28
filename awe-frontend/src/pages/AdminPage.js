import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  // 👮 Redirect non-admins
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = () => {
    axios.get('http://localhost/awe-backend/products/get_products.php')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to fetch products.'));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost/awe-backend/products/add_product.php', {
      name,
      description,
      price
    });
    fetchProducts();
    setName('');
    setDescription('');
    setPrice('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await axios.post('http://localhost/awe-backend/products/delete_product.php', {
        id
      });

      if (res.data.success) {
        fetchProducts(); // refresh the list
      } else {
        alert(res.data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error while deleting product');
    }
  };



  return (
    <>
      <style>
        {`
          .admin-page {
            padding: 2rem;
            font-family: 'Segoe UI', Inter, system-ui, sans-serif;
            background-color: #f5f5f5;
            min-height: 100vh;
          }

          .admin-page h2 {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }

          .admin-form {
            max-width: 500px;
            margin: 0 auto 2rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            background: #fff;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          }

          .admin-form input {
            padding: 0.6rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .admin-form button {
            background-color: #007bff;
            color: #fff;
            padding: 0.6rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
          }

          .admin-form button:hover {
            background-color: #0056b3;
          }

          .product-list {
            max-width: 600px;
            margin: 0 auto;
          }

          .product-list h3 {
            margin-bottom: 1rem;
            text-align: center;
            color: #333;
          }

          .product-item {
            background: #fff;
            margin-bottom: 1rem;
            padding: 1rem;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 5px rgba(0,0,0,0.05);
          }

          .product-item strong {
            font-size: 1rem;
            color: #333;
          }

          .product-item button {
            background-color: #dc3545;
            color: #fff;
            border: none;
            padding: 0.4rem 0.75rem;
            border-radius: 5px;
            cursor: pointer;
          }

          .product-item button:hover {
            background-color: #b52a37;
          }
        `}
      </style>

      <div className="admin-page">
        <h2>Admin Panel</h2>

        <form className="admin-form" onSubmit={handleAdd}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Product Name"
            required
          />
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <input
            value={price}
            type="number"
            onChange={e => setPrice(e.target.value)}
            placeholder="Price"
            required
          />
          <button type="submit">Add Product</button>
        </form>

        <div className="product-list">
          <h3>Product List</h3>
          {products.map(p => (
            <div key={p.id} className="product-item">
              <div>
                <strong>{p.name}</strong> - ${p.price}
              </div>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminPage;

function CartItem({ item }) {
  return (
    <>
      <style>
        {`
          .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #ddd;
            background-color: #fff;
            border-radius: 5px;
            margin-bottom: 0.75rem;
            box-shadow: 0 1px 4px rgba(0,0,0,0.05);
            font-family: 'Segoe UI', Inter, system-ui, sans-serif;
          }

          .cart-item p {
            margin: 0;
            font-size: 1rem;
            color: #333;
          }
        `}
      </style>

      <div className="cart-item">
        <p>{item.name}</p>
        <p>${item.price}</p>
      </div>
    </>
  );
}

export default CartItem;

function HomePage() {
  return (
    <div style={{
      fontFamily: 'Segoe UI, Inter, system-ui, sans-serif',
      textAlign: 'center',
      padding: '4rem',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
        Welcome to <span style={{ color: '#007bff' }}>AWE Electronics</span>
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#555' }}>
        Your one-stop shop for the latest tech and gadgets.
      </p>
      <a href="/products">
        <button style={{
          padding: '1rem 2.5rem',
          fontSize: '1.1rem',
          marginTop: '2rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
          Browse Products
        </button>
      </a>
    </div>
  );
}

export default HomePage;

function HomePage() {
  return (
    <div
      style={{
        fontFamily: 'Segoe UI, Inter, system-ui, sans-serif',
        backgroundImage: "url('/images/image1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '600px',
        }}
      >
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>
          Welcome to <span style={{ color: '#00bfff' }}>AWE Electronics</span>
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Your one-stop shop for the latest tech and gadgets.
        </p>
        <a href="/products">
          <button
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Browse Products
          </button>
        </a>
      </div>
    </div>
  );
}

export default HomePage;

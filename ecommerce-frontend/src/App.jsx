import "./App.css";

function App() {
  const products = [
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Phone", price: 25000 },
    { id: 3, name: "Headphones", price: 2000 },
  ];

  function handleAddToCart(productName) {
    alert(productName + " added to cart");
  }

  return (
    <div className="app">
      <h1>E-Commerce Frontend</h1>

      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => handleAddToCart(product.name)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
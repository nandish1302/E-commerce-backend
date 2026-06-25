import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products"
      );

      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load products");
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading Products...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>  
      <Navbar />

      <h1>Products Page</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>₹ {product.price}</p>
        </div>
      ))}
    </>
  );
};

export default Products;
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Products = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8080/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/cart",
        null,
        {
          params: { productId: product.id, quantity: 1 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
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
      <h2>Cart Items: {cart ? cart.length : 0}</h2>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import "../styles/Products.css";

const Products = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:8080/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/cart",
        null,
        {
          params: {
            productId: product.id,
            quantity: 1,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart((prevCart) => [
        ...prevCart,
        product,
      ]);

      console.log(
        "Product added to cart:",
        product.name
      );

    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error
      );
    }
  };

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="products-message">
          Loading Products...
        </div>
      </>
    );
  }

  // =========================
  // ERROR STATE
  // =========================

  if (error) {
    return (
      <>
        <Navbar />

        <div className="products-message error">
          {error}
        </div>
      </>
    );
  }

  // =========================
  // PRODUCTS PAGE
  // =========================

  return (
    <>
      <Navbar />

      <main className="products-page">

        {/* Products Header */}

        <div className="products-header">

          <div>
            <h1>Our Products</h1>

            <p>
              Find the products you need.
            </p>
          </div>

          <div className="products-header-actions">

            <div className="cart-count">
              Cart Items:{" "}
              {cart ? cart.length : 0}
            </div>

            <button
              className="chatbot-launch-button"
              onClick={() => navigate("/chatbot")}
            >
              💬 Customer Support
            </button>

          </div>

        </div>

        {/* Product List */}

        <div className="product-list">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />

          ))}

        </div>

      </main>
    </>
  );
};

export default Products;
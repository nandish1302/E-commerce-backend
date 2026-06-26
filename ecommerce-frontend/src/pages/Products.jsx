import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);


  const addToCart = (product) => {
    console.log("Adding to cart:", product);
  setCart((prevCart) => [...prevCart, product]);
};

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
      <h2>Cart Items: {cart.length}</h2>

     {products.map((product) => (
  <ProductCard 
        key={product.id} 
        product={product}
        addToCart={addToCart}
        />
))}
    </>
  );
};

export default Products;
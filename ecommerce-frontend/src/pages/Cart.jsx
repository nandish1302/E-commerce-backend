import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/cart/my-cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(response.data);
    } catch (error) {
      console.log("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = async (cartId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  if (loading) {
    return <div>Loading Cart...</div>;
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <h1>Your Cart is Empty</h1>
      </>
    );
  }

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <h1>Cart Page</h1>

      <p>Items: {cart.length}</p>

      <p>
        Total Price: ₹ {totalPrice.toFixed(2)}
      </p>

      {cart.map((item) => (
        <div key={item.id}>
          <h2>{item.product.name}</h2>

          <p>
            Category: {item.product.category}
          </p>

          <p>
            {item.product.description}
          </p>

          <p>
            Price: ₹ {item.product.price}
          </p>

          <p>
            Quantity: {item.quantity}
          </p>

          <p>
            Item Total: ₹{" "}
            {(item.product.price * item.quantity).toFixed(2)}
          </p>

          <Button
            text="Remove"
            onClick={() => removeFromCart(item.id)}
          />
        </div>
      ))}

      <h2>
        Total: ₹ {totalPrice.toFixed(2)}
      </h2>

      <Button
        text="Checkout"
        onClick={() => alert("Next we'll connect Orders API")}
      />
    </>
  );
};

export default Cart;
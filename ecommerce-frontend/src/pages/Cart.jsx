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
      console.log(error);
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
      console.log(error);
    }
  };

  if (loading) {
    return <h1>Loading Cart...</h1>;
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
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <h1>Cart Page</h1>

      <p>Items: {cart.length}</p>

      <p>Total Price: ₹ {totalPrice.toFixed(2)}</p>

      {cart.map((item) => (
        <div key={item.id}>
          <h2>{item.product.title}</h2>

          <p>₹ {item.product.price}</p>

          <p>Quantity: {item.quantity}</p>

          <Button
            text="Remove"
            onClick={() => removeFromCart(item.id)}
          />
        </div>
      ))}

      <Button
        text="Checkout"
        onClick={() => alert("Next we'll connect Orders API")}
      />
    </>
  );
};

export default Cart;
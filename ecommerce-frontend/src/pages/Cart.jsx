import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";

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

const Cart = () => {
  const totalPrice = cart.reduce((total, product) => {
    return total + product.price;
  },0);
  if (cart.length === 0) {
    return <h1>Empty Cart</h1>;
  }
  
 
  return (
    <>
      <Navbar />
      <h1>Cart Page</h1>
      <p>Items in cart: {cart.length}</p>
      <p>Total Price: ₹ {totalPrice.toFixed(2)}</p>  
      {cart.map((product) => (
  <div key={product.id}>
    <h2>{product.title}</h2>
    <p>₹ {product.price}</p>
    <Button
  text="Remove"
  onClick={() => removeFromCart(product.id)}
/>
  </div>
  
))}

<Button
  text="Checkout"
  onClick={handleCheckout}
/>
    </>
  );
};



export default Cart;
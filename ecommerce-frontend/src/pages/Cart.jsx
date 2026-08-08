import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/orderApi";
import "../styles/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const navigate = useNavigate();

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
      console.error("Error fetching cart:", error);
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

      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/cart/${cartId}`,
        null,
        {
          params: {
            quantity: newQuantity,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      return;
    }

    try {
      setCheckoutLoading(true);

      await placeOrder();

      // Backend clears the cart after successful order creation
      setCart([]);

      // Go to Orders page
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to place order"
        );
      } else {
        alert(
          "Something went wrong while placing the order."
        );
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="products-message">
          Loading Cart...
        </div>
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>

          <p>
            Add some products to your cart to see them here.
          </p>
        </div>
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

      <div className="cart-page">

        <h1>Cart Page</h1>

        <p className="cart-items-count">
          Items: {cart.length}
        </p>

        {cart.map((item) => (
          <div
            className="cart-item"
            key={item.id}
          >
            <div className="cart-item-info">

              <h2>
                {item.product.name}
              </h2>

              <p className="cart-item-category">
                {item.product.category}
              </p>

              <p className="cart-item-description">
                {item.product.description}
              </p>

              <p className="cart-item-price">
                ₹ {item.product.price}
              </p>

              <div className="quantity-section">

                <Button
                  text="-"
                  variant="quantity"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity - 1
                    )
                  }
                />

                <span className="quantity-number">
                  {item.quantity}
                </span>

                <Button
                  text="+"
                  variant="quantity"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                />

              </div>

              <p className="item-total">
                Item Total: ₹{" "}
                {(
                  item.product.price *
                  item.quantity
                ).toFixed(2)}
              </p>

              <Button
                text="Remove"
                variant="danger"
                onClick={() =>
                  removeFromCart(item.id)
                }
              />

            </div>
          </div>
        ))}

        <div className="cart-summary">

          <h2>
            Total: ₹ {totalPrice.toFixed(2)}
          </h2>

          <Button
            text={
              checkoutLoading
                ? "Placing Order..."
                : "Checkout"
            }
            variant="success"
            disabled={checkoutLoading}
            onClick={handleCheckout}
          />

        </div>

      </div>
    </>
  );
};

export default Cart;
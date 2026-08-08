import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="orders-message">
          Loading Orders...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="orders-message orders-error">
          {error}
        </div>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Navbar />

        <div className="empty-orders">
          <h1>No Orders Yet</h1>
          <p>
            Your orders will appear here after you complete a purchase.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="orders-page">

        <div className="orders-header">
          <h1>My Orders</h1>
          <p>{orders.length} order(s)</p>
        </div>

        <div className="orders-list">

          {orders.map((order) => (
            <div className="order-card" key={order.id}>

              <div className="order-header">

                <div>
                  <h2>Order #{order.id}</h2>
                  <p className="order-status">
                    Order Placed
                  </p>
                </div>

                <div className="order-total">
                  ₹ {order.totalAmount.toFixed(2)}
                </div>

              </div>

              <div className="order-items">

                {order.items.map((item, index) => (
                  <div
                    className="order-item"
                    key={index}
                  >

                    <span className="order-product-name">
                      {item.productName}
                    </span>

                    <span className="order-quantity">
                      Quantity: {item.quantity}
                    </span>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>

      </main>
    </>
  );
};

export default Orders;
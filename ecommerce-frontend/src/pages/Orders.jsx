import Navbar from "../components/Navbar";

const Orders = ({ orders }) => {

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <h1>Orders Page</h1>
        <h2>No Orders Yet</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <h1>Orders Page</h1>

      {orders.map((order, index) => (
        <div key={index}>

          <h2>Order #{index + 1}</h2>

          {order.map((product) => (
            <div key={product.id}>
              <p>{product.title}</p>
              <p>₹ {product.price}</p>
            </div>
          ))}

          <hr />

        </div>
      ))}

    </>
  );
};

export default Orders;
import { useState } from "react";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import  Cart  from "./pages/Cart";
import Orders from "./pages/Orders";
import { Route, Routes } from "react-router-dom";

function App(){
     const [cart, setCart] = useState([]);
     const [orders, setOrders] = useState([]);
     const removeFromCart = (id) => {
  setCart((prevCart) =>
    prevCart.filter((product) => product.id !== id)
  );
  
};

const handleCheckout = () => {
      setOrders((prevOrders) => [...prevOrders, cart]);
  alert("Order Placed Successfully!");
  setCart([]);
};    /// app
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products 
                                         cart={cart}
                                         setCart={setCart}   />} />

            <Route path="/cart" element={<Cart cart={cart}
                                        removeFromCart={removeFromCart} 
                                        handleCheckout={handleCheckout}/>
            }
            />
            <Route path="/orders" element={<Orders orders={orders} />} />
        </Routes>
    )

}
export default App;
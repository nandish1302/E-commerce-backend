import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import FAQChatbotPage from "./pages/FAQChatbot";

function App() {
  return (
    <Routes>

      {/* Authentication */}

      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* Application */}

      <Route path="/products" element={<Products />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/orders" element={<Orders />} />

      {/* AI Customer Support */}

      <Route
        path="/chatbot"
        element={<FAQChatbotPage />}
      />

    </Routes>
  );
}

export default App;
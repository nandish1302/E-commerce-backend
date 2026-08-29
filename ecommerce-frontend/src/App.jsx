import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import FAQChatbotPage from "./pages/FAQChatbot";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Routes>

      {/* Authentication */}

      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* Admin Authentication */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* Application */}

      <Route path="/products" element={<Products />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/orders" element={<Orders />} />


      {/* AI Customer Support */}

      <Route
        path="/chatbot"
        element={<FAQChatbotPage />}
      />
      <Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>

    </Routes>
  );
}

export default App;
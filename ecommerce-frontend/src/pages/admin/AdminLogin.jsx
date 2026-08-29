
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Auth.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      // Decode JWT payload
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const role = payload.role;

      // Only ADMIN can enter admin panel
      if (role !== "ROLE_ADMIN") {
        alert("Access denied. Admin account required.");
        return;
      }

      // Store admin token
      localStorage.setItem("adminToken", token);

      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Admin login error:", error);

      alert(
        error.response?.data?.message ||
          "Admin login failed. Please check your credentials."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Header */}

        <div className="auth-header">

          <h1>
            Admin Login
          </h1>

          <p>
            Sign in to manage your ecommerce store.
          </p>

        </div>


        {/* Login Form */}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="form-group">

            <label htmlFor="admin-email">
              Email
            </label>

            <input
              id="admin-email"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
            />

          </div>


          {/* Password */}

          <div className="form-group">

            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "🔐 Admin Sign In"}
          </button>

        </form>


        {/* Customer Login */}

        <div className="auth-footer">

          <p>
            Not an administrator?
          </p>

          <button
            type="button"
            className="auth-link"
            onClick={() =>
              navigate("/login")
            }
          >
            Customer Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;


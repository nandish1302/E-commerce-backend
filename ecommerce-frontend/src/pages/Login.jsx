import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password
        }
      );
      localStorage.setItem("token", response.data.token);
      alert("Login Successful");
          navigate("/products");  

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }

    
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>

      <hr />

      <h3>State Preview</h3>

      <p>Email: {email}</p>
      <p>Password: {password}</p>
    </div>
  );
};

export default Login;
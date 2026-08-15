import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Brand */}

        <Link
          to="/products"
          className="navbar-logo"
        >
          🌿 Wellness Store
        </Link>


        {/* Navigation */}

        <div className="navbar-links">

          <NavLink
            to="/products"
            className="nav-link"
          >
            Products
          </NavLink>


          <NavLink
            to="/cart"
            className="nav-link"
          >
            Cart
          </NavLink>


          <NavLink
            to="/orders"
            className="nav-link"
          >
            Orders
          </NavLink>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
    import { Link, NavLink} from "react-router-dom"; 
        const Navbar = () => {
            return(
                <nav>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/orders">Orders</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link> 
                </nav>
            )
        }

  export default Navbar;      
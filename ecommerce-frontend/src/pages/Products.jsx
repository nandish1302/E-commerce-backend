import Navbar from "../components/Navbar";
import {useState, useEffect} from "react";
import axios from "axios";


const Products = () => {
  const[products, setProducts] = useState([]);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState("");
  useEffect(() => {
  console.log("Products page opened");
}, []);
const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/products"
    );

    setProducts(response.data);

  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      <Navbar />
      <h1>Products Page</h1>
    </>
  );
};

export default Products;
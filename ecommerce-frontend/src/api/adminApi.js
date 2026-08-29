import axios from "axios";

const API_URL = "http://localhost:8080/admin/products";

// Get admin token
const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};

// Add product
export const addProduct = async (product) => {
  const token = getAdminToken();

  const response = await axios.post(
    API_URL,
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// Get all products
export const getAdminProducts = async () => {
  const token = getAdminToken();

  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const token = getAdminToken();

  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Update product
export const updateProduct = async (id, product) => {
  const token = getAdminToken();

  const response = await axios.put(
    `${API_URL}/${id}`,
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
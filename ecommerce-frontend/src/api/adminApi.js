import axios from "axios";


// ==========================================
// API URLs
// ==========================================

const API_URL = "http://localhost:8080/admin/products";

const ADMIN_API_URL = "http://localhost:8080/admin";


// ==========================================
// GET ADMIN TOKEN
// ==========================================

const getAdminToken = () => {

  return localStorage.getItem("adminToken");

};


// ==========================================
// AUTHORIZATION HEADERS
// ==========================================

const getAuthHeaders = () => {

  const token = getAdminToken();

  return {
    Authorization: `Bearer ${token}`,
  };

};


// ==================================================
// PRODUCT APIs
// ==================================================


// ==========================================
// ADD PRODUCT
// ==========================================

export const addProduct = async (product) => {

  const response = await axios.post(
    API_URL,
    product,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;

};


// ==========================================
// GET ALL PRODUCTS
// ==========================================

export const getAdminProducts = async () => {

  const response = await axios.get(
    API_URL,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;

};


// ==========================================
// DELETE PRODUCT
// ==========================================

export const deleteProduct = async (id) => {

  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;

};


// ==========================================
// UPDATE PRODUCT
// ==========================================

export const updateProduct = async (
  id,
  product
) => {

  const response = await axios.put(
    `${API_URL}/${id}`,
    product,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;

};


// ==================================================
// ADMIN DASHBOARD APIs
// ==================================================


// ==========================================
// GET DASHBOARD STATISTICS
// ==========================================

export const getDashboard = async () => {

  const response = await axios.get(
    `${ADMIN_API_URL}/dashboard`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;

};


// ==========================================
// GET ALL ORDERS
// ==========================================

export const getAdminOrders = async () => {

  const response = await axios.get(
    `${ADMIN_API_URL}/orders`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;

};


// ==========================================
// UPDATE ORDER STATUS
// ==========================================

export const updateOrderStatus = async (
  orderId,
  status
) => {

  const response = await axios.put(
    `${ADMIN_API_URL}/orders/${orderId}/status`,
    null,
    {
      params: {
        status: status,
      },

      headers: getAuthHeaders(),
    }
  );

  return response.data;

};

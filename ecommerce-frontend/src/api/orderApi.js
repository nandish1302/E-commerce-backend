import axios from "axios";

const BASE_URL = "http://localhost:8080/orders";

export const placeOrder = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    BASE_URL,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/my-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
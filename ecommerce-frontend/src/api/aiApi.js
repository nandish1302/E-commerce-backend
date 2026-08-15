import axios from "axios";

const BASE_URL = "http://localhost:8080/ai";

export const askFAQ = async (question) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/faq`,
    {
      question: question,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
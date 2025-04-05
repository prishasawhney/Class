import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Change this to match your backend URL

export const chatWithGemini = async (query) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Chatbot response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error communicating with chatbot:", error);
    throw error;
  }
};

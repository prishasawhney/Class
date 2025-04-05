import axios from "axios";

const API_BASE_URL = "https://c-l-a-s-s-cognitive-learning-with-ai-for.onrender.com"; // Change this to match your backend URL

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

import axios from "axios";

const BASE_URL = "https://c-l-a-s-s-cognitive-learning-with-ai-for.onrender.com";

export const makeItLitt = async (note) => {
  try {
    const response = await axios.post(`${BASE_URL}/make-it-litt`, note);
    return response.data;
  } catch (error) {
    console.error("Error in makeItLitt:", error);
    throw error;
  }
};

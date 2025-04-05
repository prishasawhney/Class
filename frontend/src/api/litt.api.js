import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const makeItLitt = async (note) => {
  try {
    const response = await axios.post(`${BASE_URL}/make-it-litt`, note);
    return response.data;
  } catch (error) {
    console.error("Error in makeItLitt:", error);
    throw error;
  }
};

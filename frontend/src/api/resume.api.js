import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Update if deployed on a different server

export const generateResumeScoreWithGemini = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/scorer`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error calling resume scoring API:", error);
    throw error;
  }
};

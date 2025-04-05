import axios from "axios";

const BASE_URL = "https://c-l-a-s-s-cognitive-learning-with-ai-for.onrender.com"; // Update this if needed

export const readComments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/comment/read`);
    return response.data;
  } catch (error) {
    console.error("Error reading comments:", error.response?.data || error.message);
    throw error;
  }
};

export const createComment = async (newComment) => {
  try {
    const response = await axios.post(`${BASE_URL}/comment/create`, newComment);
    return response.data; // { message: commentKey }
  } catch (error) {
    console.error("Error creating comment:", error.response?.data || error.message);
    throw error;
  }
};

export const upvoteComment = async (vote) => {
  try {
    const response = await axios.post(`${BASE_URL}/comment/upvote`, vote);
    return response.data;
  } catch (error) {
    console.error("Error upvoting comment:", error.response?.data || error.message);
    throw error;
  }
};

export const downvoteComment = async (vote) => {
  try {
    const response = await axios.post(`${BASE_URL}/comment/downvote`, vote);
    return response.data;
  } catch (error) {
    console.error("Error downvoting comment:", error.response?.data || error.message);
    throw error;
  }
};

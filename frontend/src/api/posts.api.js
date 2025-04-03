import axios from "axios";

const BASE_URL = "http://localhost:8000"; // Update this if needed

export const readPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/post/read`);
    return response.data;
  } catch (error) {
    console.error("Error reading posts:", error.response?.data || error.message);
    throw error;
  }
};

export const createPost = async (newPost) => {
  try {
    const response = await axios.post(`${BASE_URL}/post/create`, newPost);
    return response.data; // { message: postKey }
  } catch (error) {
    console.error("Error creating post:", error.response?.data || error.message);
    throw error;
  }
};

export const toggleLikePost = async ({ postKey, username }) => {
  try {
    console.log("Sending:", { postKey, username });
    const response = await axios.post(`${BASE_URL}/post/like-unlike`, { postKey, username });
    return response.data;
  } catch (error) {
    console.error("Error toggling like on post:", error.response?.data || error.message);
    throw error;
  }
};

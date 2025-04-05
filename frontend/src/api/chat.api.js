import axios from "axios";

export const generateChatResponse = async (textMessage, imageMessage, username) => {
  const formData = new FormData();
  if (imageMessage) {
    formData.append("file", imageMessage);
  }
  if (textMessage) {
    formData.append("userPrompt", textMessage);
  }
  // Add the username as required by the backend
  formData.append("username", username);

  try {
    const response = await axios.post(
      "https://c-l-a-s-s-cognitive-learning-with-ai-for.onrender.com/imagesolver/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.response;
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    return "Sorry, there was an error processing your request.";
  }
};

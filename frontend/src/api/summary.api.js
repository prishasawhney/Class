import axios from "axios";

const BASE_URL = "https://c-l-a-s-s-cognitive-learning-with-ai-for.onrender.com"; // Update this if needed

export const fetchSummaryForNote = async (noteKey, username) => {
    try {
        const formData = new FormData();
        formData.append("noteKey", noteKey);
        formData.append("username", username);

        const response = await axios.post(`${BASE_URL}/summarizer`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching summary:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchSummaryForPDF = async (file, username) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);

        const response = await axios.post(`${BASE_URL}/summarizer`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data; // Expected to contain the summary
    } catch (error) {
        console.error("Error summarizing PDF:", error.response?.data || error.message);
        throw error;
    }
};
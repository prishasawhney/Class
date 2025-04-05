import axios from "axios";

const BASE_URL = "http://localhost:8000"; // Update this if needed

export const fetchFlashcardForNote = async (noteKey, username) => {
    try {
        const formData = new FormData();
        formData.append("noteKey", noteKey);
        formData.append("username", username);

        const response = await axios.post(`${BASE_URL}/flashcards`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching flashcards:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchFlashcardForPDF = async (file, username) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);

        const response = await axios.post(`${BASE_URL}/flashcards`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data; // Expected to contain the summary
    } catch (error) {
        console.error("Error creating flashcards for PDF:", error.response?.data || error.message);
        throw error;
    }
};
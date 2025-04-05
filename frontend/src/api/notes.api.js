import axios from 'axios';

// API base URL (adjust this as needed)
const BASE_URL = "https://c-l-a-s-s-cognitive-learning-with-ai-for.onrender.com"; // Replace with your backend URL if different

// Create a new note
export const createNote = async (note) => {
    try {
        const response = await axios.post(`${BASE_URL}/notes/create`, note);
        return response.data;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
};

// Read notes by username
export const readNotes = async (username) => {
    try {
        const response = await axios.get(`${BASE_URL}/notes/read`, {
            params: { username: username },
        });
        return response.data;
    } catch (error) {
        console.error("Error reading notes:", error);
        throw error;
    }
};

// Update an existing note
export const updateNote = async (note) => {
    try {
        const response = await axios.put(`${BASE_URL}/notes/update`, note);
        return response.data;
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
};

// Delete a note by noteKey
export const deleteNoteByKey = async (note) => {
    try {
        const response = await axios.delete(`${BASE_URL}/notes/delete`, {
            data: note,
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
};

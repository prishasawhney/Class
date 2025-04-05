import axios from "axios";

const API_BASE_URL = "https://c-l-a-s-s-cognitive-learning-with-ai-for.onrender.com"; // Change if hosted elsewhere

// Create a new todo
export const createTodo = async (todoData) => {
    const response = await axios.post(`${API_BASE_URL}/todo/create`, todoData);
    return response.data;
};

// Read all todos for a user
export const getTodos = async (username) => {
    const response = await axios.get(`${API_BASE_URL}/todo/read`, { params: { username } });
    return response.data;
};

// Toggle completion status of a todo
export const toggleTodoCompletion = async (todoData) => {
    const response = await axios.put(`${API_BASE_URL}/todo/complete`, todoData);
    return response.data;
};

// Update a todo
export const updateTodo = async (todoData) => {
    const response = await axios.put(`${API_BASE_URL}/todo/update`, todoData);
    return response.data;
};

// Delete a todo
export const deleteTodo = async (todoData) => {
    const response = await axios.delete(`${API_BASE_URL}/todo/delete`, { data: todoData });
    return response.data;
};

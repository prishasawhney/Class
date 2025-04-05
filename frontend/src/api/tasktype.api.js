import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Change if hosted elsewhere

// Create a new task type
export const createTaskType = async (taskTypeData) => {
    const response = await axios.post(`${API_BASE_URL}/taskType/create`, taskTypeData);
    return response.data;
};

// Read all task types for a user
export const getTaskTypes = async (username) => {
    const response = await axios.get(`${API_BASE_URL}/taskType/read`, { params: { username } });
    return response.data;
};

// Delete a task type
export const deleteTaskType = async (taskTypeData) => {
    const response = await axios.delete(`${API_BASE_URL}/taskType/delete`, { data: taskTypeData });
    return response.data;
};

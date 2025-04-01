import { createContext, useContext, useState, useEffect } from "react";
import { createTodo, getTodos, toggleTodoCompletion, updateTodo, deleteTodo } from "../api/todo.api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [openTaskKey, setOpenTaskKey] = useState(null);
    const username = ""; // Replace with actual logged-in user

    // Fetch tasks when component mounts
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todos = await getTodos(username);
                setTasks(todos);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTodos();
    }, []);

    // Add a new task
    const addTask = async (newTask) => {
        try {
            const response = await createTodo({ ...newTask, username });
            setTasks([...tasks, { ...newTask, taskKey: response.taskKey, isCompleted: false }]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Toggle task completion
    const toggleTaskCompletion = async (taskKey) => {
        try {
            const updatedStatus = !(tasks.find(t => t.taskKey === taskKey)?.isCompleted);
            await toggleTodoCompletion({ username, taskKey, isCompleted: updatedStatus });
    
            setTasks(tasks.map(t =>
                t.taskKey === taskKey ? { ...t, isCompleted: updatedStatus } : t
            ));
        } catch (error) {
            console.error("Error updating task completion:", error);
        }
    };
    

    // Update task details
    const editTask = async (updatedTask) => {
        try {
            await updateTodo({ ...updatedTask, username });
            setTasks(tasks.map(task =>
                task.taskKey === updatedTask.taskKey ? updatedTask : task
            ));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Delete a task
    const removeTask = async (taskKey) => {
        try {
            await deleteTodo({ username, taskKey });
            setTasks(tasks.filter(task => task.taskKey !== taskKey));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, editTask, removeTask, openTaskKey, setOpenTaskKey }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};

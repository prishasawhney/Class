import { createContext, useContext, useState, useEffect } from "react";
import { createTaskType, getTaskTypes, deleteTaskType } from "../api/tasktype.api";

const TaskTypeContext = createContext();

export const TaskTypeProvider = ({ children }) => {
    const [taskTypes, setTaskTypes] = useState([]);
<<<<<<< HEAD
    const username = ""; // Replace with actual logged-in user
=======
    const username = "Ikjot"; // Replace with actual logged-in user
>>>>>>> 551c548ca7de978af87a462893c9c525f70c2ddd

    // Fetch task types when component mounts
    useEffect(() => {
        const fetchTaskTypes = async () => {
            try {
                const data = await getTaskTypes(username);
                setTaskTypes(data);
            } catch (error) {
                console.error("Error fetching task types:", error);
            }
        };
        fetchTaskTypes();
    }, []);

    // Add a new task type
    const addTaskType = async (taskTypeName, taskTypeColor) => {
        if (!taskTypeName.trim()) return;

        const newTaskType = { username, taskTypeName, taskTypeColor };
        try {
            const response = await createTaskType(newTaskType);
            setTaskTypes([...taskTypes, { taskTypeKey: response.taskTypeKey, taskTypeName, taskTypeColor }]);
        } catch (error) {
            console.error("Error adding task type:", error);
        }
    };

    // Delete a task type
    const removeTaskType = async (taskTypeKey, tasks) => {
        const taskType = taskTypes.find(tt => tt.taskTypeKey === taskTypeKey);
        const hasTasks = tasks.some(task => task.taskType === taskType.taskTypeName);

        if (hasTasks) {
            console.error("Cannot delete this task type! There are tasks associated with it.");
            return;
        }

        try {
            await deleteTaskType({ username, taskTypeKey });
            setTaskTypes(taskTypes.filter(tt => tt.taskTypeKey !== taskTypeKey));
        } catch (error) {
            console.error("Error deleting task type:", error);
        }
    };

    return (
        <TaskTypeContext.Provider value={{ taskTypes, addTaskType, removeTaskType }}>
            {children}
        </TaskTypeContext.Provider>
    );
};

export const useTaskTypes = () => {
    return useContext(TaskTypeContext);
};

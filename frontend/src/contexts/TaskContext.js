import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        { taskKey: 1, taskName: "Buy groceries", taskType: "Shopping", taskColor: "#ff6347", isCompleted: false, dueDate: "2025-03-19", taskDescription: "Milk, eggs, bread" },
        { taskKey: 2, taskName: "Meeting", taskType: "Work", taskColor: "#4682b4", isCompleted: false, dueDate: "2025-03-21", taskDescription: "Client call at 3PM" },
        { taskKey: 3, taskName: "Workout", taskType: "Personal", taskColor: "#ffa500", isCompleted: false, dueDate: "2025-03-22", taskDescription: "1-hour gym session" },
        { taskKey: 4, taskName: "Read book", taskType: "Personal", taskColor: "#ffa500", isCompleted: false, dueDate: "2025-03-23", taskDescription: "Read 20 pages" },
        { taskKey: 5, taskName: "Code project", taskType: "Work", taskColor: "#4682b4", isCompleted: false, dueDate: "2025-03-24", taskDescription: "Fix bugs in React app" },
    ]);

    const addTask = (newTask) => {
        setTasks([...tasks, { ...newTask, taskKey: tasks.length + 1 }]);
    };

    const deleteTask = (taskKey) => {
        setTasks(tasks.filter(task => task.taskKey !== taskKey));
    };

    const toggleTaskCompletion = (task) => {
        const updatedTasks = tasks.map(t =>
            t.taskKey === task.taskKey ? { ...t, isCompleted: !t.isCompleted } : t
        );
        setTasks(updatedTasks);
    };
    

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, deleteTask, toggleTaskCompletion }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};

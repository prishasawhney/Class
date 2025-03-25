import React, { useState, useEffect } from "react";
import "./Todo.css";
import Calendar from "./Calendar";
import dayjs from "dayjs";

const AddTaskPanel = ({
    setTaskPanel,
    taskTypes,
    taskPanel,
    addTaskType,
    tasks,
    setTasks,
    editingTask,
    setEditingTask,
}) => {
    const [taskName, setTaskName] = useState(editingTask?.taskName || "");
    const [taskDescription, setTaskDescription] = useState(editingTask?.taskDescription || "");
    const [dueDate, setDueDate] = useState(editingTask?.dueDate || dayjs().format("YYYY-MM-DD"));
    const [taskType, setTaskType] = useState(editingTask?.taskType || "");
    const [customTaskType, setCustomTaskType] = useState("");
    const [customTaskColor, setCustomTaskColor] = useState("#ff6347");

    useEffect(() => {
        if (editingTask) {
            setTaskName(editingTask.taskName);
            setTaskDescription(editingTask.taskDescription);
            setDueDate(editingTask.dueDate);
            setTaskType(editingTask.taskType);
        }
    }, [editingTask]);

    useEffect(() => {
        if (!editingTask) {
            setTaskName("");
            setTaskType("");
            setTaskDescription("");
            setDueDate(dayjs().format("YYYY-MM-DD"));
        }
    }, [editingTask]);
    

    const removeContent = () => {
        setTaskName("");
        setTaskDescription("");
        setDueDate(dayjs().format("YYYY-MM-DD"));
        setTaskType("");
        setCustomTaskType("");
        setCustomTaskColor("#ff6347");
        setEditingTask(null); // Clear edit mode
    };

    const saveTask = (e) => {
        e.preventDefault();

        if (!taskName.trim() || !dueDate) {
            alert("Please enter a task name and due date.");
            return;
        }

        if (editingTask) {
            // Edit existing task
            setTasks(tasks.map(task =>
                task.taskKey === editingTask.taskKey
                    ? { ...task, taskName, taskDescription, dueDate, taskType }
                    : task
            ));
        } else {
            // Add new task
            const newTask = {
                taskKey: tasks.length + 1,
                taskName,
                taskColor: taskTypes.find(t => t.taskTypeName === taskType)?.taskColor || "#000000",
                isCompleted: false,
                dueDate,
                taskDescription,
            };

            setTasks([...tasks, newTask]);
        }

        removeContent();
        setTaskPanel(false);
    }; 

    return (
        <div id="taskPanel" className={taskPanel ? "show" : "hide"}>
            <div id="createNewTask">
                <div id="undo" >
                    <box-icon type="solid" name="chevron-right" onClick={() => setTaskPanel(false)}></box-icon>
                    <h2>{editingTask ? "Edit Task" : "New Task"}:</h2>
                </div>
                <Calendar tasks={tasks} dueDate={dueDate} setDueDate={setDueDate}/>
                <form onSubmit={saveTask}>
                    <div className="input-group">
                        <input
                            type="text"
                            id="addtask"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                            className="input"
                        />
                        <label className="user-label">Task Heading</label>
                    </div>

                    <div className="input-group">
                        <textarea
                            id="description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            required
                            className="input"
                            rows="5"
                        ></textarea>
                        <label className="user-label">Task Description</label>
                    </div>

                    <div id="duedatediv">
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            placeholder="Set Due Date"
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Task Type Dropdown */}
                    <div className="select-group">
                        <select
                            required
                            id="selectList"
                            className="select-input"
                            value={taskType === "custom" ? "" : taskType}
                            name="selectedList"
                            onChange={(e) => setTaskType(e.target.value)}
                        >
                            <option value="" disabled hidden></option>
                            {taskTypes.map((li, index) => (
                                <option key={index} value={li.taskTypeName}>
                                    {li.taskTypeName}
                                </option>
                            ))}
                            <option value="custom">Other</option>
                        </select>
                        <label className="select-label">Type of Task</label>
                    </div>

                    {/* Custom Task Type Input */}
                    {taskType === "custom" && (
                        <div className="custom-task-group input-group">
                            <input
                                type="text"
                                id="customTaskType"
                                className="input"
                                value={customTaskType}
                                onChange={(e) => setCustomTaskType(e.target.value)}
                                required
                            />
                            <label className="user-label">Enter custom task type</label>
                            <input
                                type="color"
                                id="customTaskColor"
                                value={customTaskColor}
                                onChange={(e) => setCustomTaskColor(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (customTaskType.trim()) {
                                        addTaskType(customTaskType, customTaskColor);
                                        setTaskType(customTaskType);
                                        setCustomTaskType("");
                                        setCustomTaskColor("#ff6347");
                                    }
                                }}
                            >
                                Add
                            </button>
                        </div>
                    )}

                    <div id="buttons">
                        <button type="button" onClick={removeContent}>
                            Reset
                        </button>
                        <button id="savebutton" type="submit">
                            {editingTask ? "Save Changes" : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AddTaskPanel;

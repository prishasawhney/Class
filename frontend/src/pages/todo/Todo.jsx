import React, { useState, useEffect } from "react";
import "./Todo.css";
import TaskType from "./TaskType";
import Task from "./Task";
import AddTaskPanel from "./AddTaskPanel";
import Calendar from "./Calendar";
import { useError } from "../../contexts/ErrorContext";
import { useTasks } from "../../contexts/TaskContext";
import { useTaskTypes } from "../../contexts/TaskTypeContext"; 

const ToDoPage = () => {
    const { showError } = useError();
    const { tasks, setTasks, removeTask, toggleTaskCompletion, setOpenTaskKey, openTaskKey } = useTasks();
    const { taskTypes, addTaskType, removeTaskType } = useTaskTypes();

    const [searchQuery, setSearchQuery] = useState("");
    const [taskPanel, setTaskPanel] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const convertToISOFormat = (dateStr) => {
        const parts = dateStr.split("-"); // Split by "-"
        if (parts.length !== 3) return null; // Ensure valid format
        return `${parts[2]}-${parts[1]}-${parts[0]}`; // Rearrange to yyyy-mm-dd
    }

    const today = new Date().toISOString().split("T")[0];
    const overdueTasks = tasks.filter(task => convertToISOFormat(task.dueDate) < today);
    const upcomingTasks = tasks.filter(task => convertToISOFormat(task.dueDate) >= today);
    const completedTasks = tasks.filter(task => task.isCompleted);
    const isWeekend = [0, 6].includes(new Date().getDay());

    const greetings = {
        overdueFew: "You've got a few overdue tasks! Let's catch up.",
        overdueMany: "Oh no! Several tasks are overdue. Time to focus!",
        noTasksToday: "No tasks for today! Enjoy your free time.",
        allDone: "Great job! All tasks are completed.",
        upcomingTasks: "You have some upcoming tasks. Stay ahead!",
        weekendMode: "It's the weekend! Time to relax or catch up.",
    };

    let greetingMessage = greetings.upcomingTasks;
    if (overdueTasks.filter(task => !task.isCompleted).length > 0) {
        greetingMessage = overdueTasks.length > 2 ? greetings.overdueMany : greetings.overdueFew;
    } else if (tasks.length === completedTasks.length) {
        greetingMessage = greetings.allDone;
    } else if (upcomingTasks.length === 0) {
        greetingMessage = greetings.noTasksToday;
    } else if (isWeekend) {
        greetingMessage = greetings.weekendMode;
    }

    const sortTasksByDate = (tasks) => {
        return tasks.slice().sort((a, b) => new Date(convertToISOFormat(a.dueDate)) - new Date(convertToISOFormat(b.dueDate)));
    };

    const countTasksByType = (taskTypeName) => {
        return tasks.filter(task => task.taskType === taskTypeName && task.isCompleted === false).length;
    };

    const filteredOverdueTasks = sortTasksByDate(overdueTasks).filter(task =>
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredUpcomingTasks = sortTasksByDate(upcomingTasks).filter(task =>
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div id="todoPage">
            <div id= {taskPanel ? "shortGreeting":"greeting"}>
                <h1>{greetingMessage}</h1>
            </div>
            {!taskPanel && (<div id="calendar"><Calendar /></div>)}
            {!taskPanel && (
                <div id="taskTypeList">
                    {taskTypes.map((taskType) => (
                        <TaskType
                            key={taskType.taskTypeKey}
                            taskKey={taskType.taskTypeKey}
                            taskName={taskType.taskTypeName}
                            taskColor={taskType.taskTypeColor}
                            setTaskPanel={setTaskPanel}
                            removeTaskType={() => removeTaskType(taskType.taskTypeKey, tasks)}
                            taskCount={countTasksByType(taskType.taskTypeName)}
                        />
                    ))}
                </div>
            )}
            <div id="todoList">
                <div id="toDoHeader">
                    <div id="todopageSearchBar">
                        <box-icon name="search" color="#aaaa"></box-icon>
                        <input
                            type="text"
                            placeholder="Search Anything..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="button" onClick={() => { setEditingTask(null); setTaskPanel(true) }}>
                        <svg viewBox="0 0 448 512" className="svgIcon">
                            <path d="M432 256c0 13.3-10.7 24-24 24h-152v152c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H40c-13.3 0-24-10.7-24-24s10.7-24 24-24h152V80c0-13.3 10.7-24 24-24s24 10.7 24 24v152h152c13.3 0 24 10.7 24 24z" />
                        </svg>
                    </button>
                </div>
                {/* Overdue Tasks */}
                {filteredOverdueTasks.length > 0 && (
                    <div className="taskSection">
                        <div className="taskSectionTitle" style={{display:"flex", alignItems:"center", gap:"5px"}}>
                            <img src="/overdue.gif" style={{height:'45px'}}></img>
                        <h3>Overdue Tasks</h3>
                        </div>
                        {filteredOverdueTasks.map((task) => (
                            <Task
                                key={task.taskKey}
                                task={task}
                                setTaskPanel={setTaskPanel}
                                setEditingTask={setEditingTask}
                                removeTask={() => removeTask(task.taskKey)}
                                toggleTaskCompletion={() => toggleTaskCompletion(task.taskKey)}
                                setOpenTaskKey={setOpenTaskKey}
                                openTaskKey={openTaskKey}
                            />
                        ))}
                    </div>
                )}
                {/* Upcoming Tasks */}
                {filteredUpcomingTasks.length > 0 && (
                    <div className="taskSection">
                        <div className="taskSectionTitle" style={{display:"flex", alignItems:"center", gap:"5px"}}> 
                            <img src="/upcoming.gif" style={{height:'45px'}}></img>
                        <h3>Upcoming Tasks</h3>
                        </div>
                        {filteredUpcomingTasks.map((task) => (
                            <Task
                                key={task.taskKey}
                                task={task}
                                setEditingTask={setEditingTask}
                                removeTask={() => removeTask(task.taskKey)}
                                toggleTaskCompletion={() => toggleTaskCompletion(task.taskKey)}
                                setOpenTaskKey={setOpenTaskKey}
                                openTaskKey={openTaskKey}
                            />
                        ))}
                    </div>
                )}
            </div>
            <AddTaskPanel
                setTaskPanel={setTaskPanel}
                taskTypes={taskTypes}
                taskPanel={taskPanel}
                addTaskType={addTaskType}
                tasks={tasks}
                setTasks={setTasks}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />
        </div>
    );
};

export default ToDoPage;
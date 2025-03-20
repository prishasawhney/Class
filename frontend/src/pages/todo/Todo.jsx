import React, { useState, useEffect, useRef } from "react";
import "./Todo.css";
import TaskType from "./TaskType";
import Task from "./Task";
import AddTaskPanel from "./AddTaskPanel";
import Calendar from "./Calendar";
import { useError } from "../../contexts/ErrorContext";

const ToDoPage = () => {
    const { showError } = useError();

    const greetings = {
        overdueFew: "You've got a few overdue tasks! Let's catch up.",
        overdueMany: "Oh no! Several tasks are overdue. Time to focus!",
        noTasksToday: "No tasks for today! Enjoy your free time.",
        allDone: "Great job! All tasks are completed.",
        upcomingTasks: "You have some upcoming tasks. Stay ahead!",
        newTasksAdded: "New tasks added! Let's get started.",
        weekendMode: "It's the weekend! Time to relax or catch up.",
    };


    const [taskTypes, setTaskTypes] = useState([
        { taskTypeKey: 1, taskTypeName: "Work", taskColor: "#ff6347" },
        { taskTypeKey: 2, taskTypeName: "Personal", taskColor: "#4682b4" },
        { taskTypeKey: 3, taskTypeName: "Shopping", taskColor: "#32cd32" },
        { taskTypeKey: 1, taskTypeName: "Work", taskColor: "#ff6347" },
        { taskTypeKey: 2, taskTypeName: "Personal", taskColor: "#4682b4" },
        { taskTypeKey: 3, taskTypeName: "Shopping", taskColor: "#32cd32" },
        { taskTypeKey: 1, taskTypeName: "Work", taskColor: "#ff6347" },
        { taskTypeKey: 2, taskTypeName: "Personal", taskColor: "#4682b4" },
        { taskTypeKey: 3, taskTypeName: "Shopping", taskColor: "#32cd32" }
    ]);

    const sortTasksByDate = (tasks) => {
        return tasks.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    };


    const [tasks, setTasks] = useState([
        { taskKey: 1, taskName: "Buy groceries", taskType: "Shopping", taskColor: "#ff6347", isCompleted: false, dueDate: "2025-03-19", taskDescription: "Milk, eggs, bread" },
        { taskKey: 2, taskName: "Meeting", taskType: "Work", taskColor: "#4682b4",isCompleted: false, dueDate: "2025-03-21", taskDescription: "Client call at 3PM" },
        { taskKey: 3, taskName: "Workout", taskType: "Personal", taskColor: "#32cd32", isCompleted: true, dueDate: "2025-03-22", taskDescription: "1-hour gym session" },
        { taskKey: 4, taskName: "Read book", taskType: "Personal", taskColor: "#ffa500", isCompleted: false, dueDate: "2025-03-23", taskDescription: "Read 20 pages" },
        { taskKey: 5, taskName: "Code project", taskType: "Work", taskColor: "#9370db", isCompleted: false, dueDate: "2025-03-24", taskDescription: "Fix bugs in React app" },
        { taskKey: 1, taskName: "Buy groceries", taskType: "Shopping", taskColor: "#ff6347", isCompleted: false, dueDate: "2025-03-19", taskDescription: "Milk, eggs, bread" },
        { taskKey: 2, taskName: "Meeting", taskType: "Work", taskColor: "#4682b4",isCompleted: false, dueDate: "2025-03-21", taskDescription: "Client call at 3PM" },
        { taskKey: 3, taskName: "Workout", taskType: "Personal", taskColor: "#32cd32", isCompleted: true, dueDate: "2025-03-22", taskDescription: "1-hour gym session" },
        { taskKey: 4, taskName: "Read book", taskType: "Personal", taskColor: "#ffa500", isCompleted: false, dueDate: "2025-03-23", taskDescription: "Read 20 pages" },
        { taskKey: 5, taskName: "Code project", taskType: "Work", taskColor: "#9370db", isCompleted: false, dueDate: "2025-03-24", taskDescription: "Fix bugs in React app" },
        { taskKey: 1, taskName: "Buy groceries", taskType: "Shopping", taskColor: "#ff6347", isCompleted: false, dueDate: "2025-03-19", taskDescription: "Milk, eggs, bread" },
        { taskKey: 2, taskName: "Meeting", taskType: "Work", taskColor: "#4682b4",isCompleted: false, dueDate: "2025-03-21", taskDescription: "Client call at 3PM" },
        { taskKey: 3, taskName: "Workout", taskType: "Personal", taskColor: "#32cd32", isCompleted: true, dueDate: "2025-03-22", taskDescription: "1-hour gym session" },
        { taskKey: 4, taskName: "Read book", taskType: "Personal", taskColor: "#ffa500", isCompleted: false, dueDate: "2025-03-23", taskDescription: "Read 20 pages" },
        { taskKey: 5, taskName: "Code project", taskType: "Work", taskColor: "#9370db", isCompleted: false, dueDate: "2025-03-24", taskDescription: "Fix bugs in React app" },
        { taskKey: 1, taskName: "Buy groceries", taskType: "Shopping", taskColor: "#ff6347", isCompleted: false, dueDate: "2025-03-19", taskDescription: "Milk, eggs, bread" },
        { taskKey: 2, taskName: "Meeting", taskType: "Work", taskColor: "#4682b4",isCompleted: false, dueDate: "2025-03-21", taskDescription: "Client call at 3PM" },
        { taskKey: 3, taskName: "Workout", taskType: "Personal", taskColor: "#32cd32", isCompleted: true, dueDate: "2025-03-22", taskDescription: "1-hour gym session" },
        { taskKey: 4, taskName: "Read book", taskType: "Personal", taskColor: "#ffa500", isCompleted: false, dueDate: "2025-03-23", taskDescription: "Read 20 pages" },
        { taskKey: 5, taskName: "Code project", taskType: "Work", taskColor: "#9370db", isCompleted: false, dueDate: "2025-03-24", taskDescription: "Fix bugs in React app" },
    ]);

    const [taskPanel, setTaskPanel] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const addTaskType = (taskTypeName, taskTypeColor) => {
        if (!taskTypeName.trim()) return;

        const newTaskType = {
            taskTypeKey: taskTypes.length + 1,
            taskTypeName: taskTypeName,
            taskColor: taskTypeColor
        };

        setTaskTypes([...taskTypes, newTaskType]);
    };

    const deleteTask = (taskKey) => {
        setTasks(tasks.filter(task => task.taskKey !== taskKey));
    };

    const deleteTaskType = (taskTypeKey) => {
        const taskType = taskTypes.find(tt => tt.taskTypeKey === taskTypeKey);
        const hasTasks = tasks.some(task => task.taskColor === taskType.taskColor);

        if (hasTasks) {
            showError("Cannot delete this task type! There are tasks associated with it.");
            return;
        }

        setTaskTypes(taskTypes.filter(tt => tt.taskTypeKey !== taskTypeKey));
    };

    const today = new Date().toISOString().split("T")[0];

    const overdueTasks = tasks.filter(task => !task.isCompleted && task.dueDate < today);
    const upcomingTasks = tasks.filter(task => !task.isCompleted && task.dueDate >= today);
    const completedTasks = tasks.filter(task => task.isCompleted);
    const isWeekend = [0, 6].includes(new Date().getDay()); 
    let greetingMessage = greetings.upcomingTasks; 
    if (overdueTasks.length > 0) {
        greetingMessage = overdueTasks.length > 2 ? greetings.overdueMany : greetings.overdueFew;
    } else if (tasks.length === completedTasks.length) {
        greetingMessage = greetings.allDone;
    } else if (upcomingTasks.length === 0) {
        greetingMessage = greetings.noTasksToday;
    } else if (isWeekend) {
        greetingMessage = greetings.weekendMode;
    }

    const countTasksByType = (taskTypeName) => {
        return tasks.filter(task => task.taskType === taskTypeName).length;
    };

    const toggleTaskCompletion = (task) => {
        const updatedTasks = tasks.map(t =>
            t.taskKey === task.taskKey ? { ...t, isCompleted: !t.isCompleted } : t
        );
        setTasks(updatedTasks);
    };

    return (
        <div id="todoPage">
            <div id="greeting">
                <h1>{greetingMessage}</h1>
                {!taskPanel && (<button class="button" onClick={() => {  setEditingTask(null);setTaskPanel(true) }}>
                    <svg viewBox="0 0 448 512" class="svgIcon">
                        <path d="M432 256c0 13.3-10.7 24-24 24h-152v152c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H40c-13.3 0-24-10.7-24-24s10.7-24 24-24h152V80c0-13.3 10.7-24 24-24s24 10.7 24 24v152h152c13.3 0 24 10.7 24 24z" />
                    </svg>

                </button>)}
            </div>
            {!taskPanel && (<Calendar tasks={tasks}/>)}
            {!taskPanel && (<div id="taskTypeList">
                {taskTypes.map((taskType) => (
                    <TaskType
                        taskKey={taskType.taskTypeKey}
                        taskName={taskType.taskTypeName}
                        taskColor={taskType.taskColor}
                        setTaskPanel={setTaskPanel}
                        deleteTaskType={() => deleteTaskType(taskType.taskTypeKey)}
                        taskCount={countTasksByType(taskType.taskTypeName)}
                    />
                ))}
            </div>)}
            <div id="todoList"
                style={{ gridColumnEnd: !taskPanel ? "4" : "5" }}
            >
                {sortTasksByDate(tasks).map((task) => (
                    <Task
                        key={task.taskKey}
                        task={task}
                        setTaskPanel={setTaskPanel}
                        setEditingTask={setEditingTask}
                        deleteTask={() => deleteTask(task.taskKey)}
                        toggleTaskCompletion={()=>toggleTaskCompletion(task)}
                    >
                    </Task>
                ))}

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
    )
};

export default ToDoPage;
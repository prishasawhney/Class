import React from 'react';
import "boxicons";
import "./Todo.css";

const Task = ({ task, setTaskPanel, setEditingTask, deleteTask, toggleTaskCompletion, openTaskKey, setOpenTaskKey }) => {
    
    const isExpanded = openTaskKey === task.taskKey;

    const handleExpandToggle = () => {
        setOpenTaskKey(isExpanded ? null : task.taskKey);
    };

    return (
        <div className="newtodo">
            <div className="taskTypeStrip" style={{ background: task.taskColor }}></div>

            {!isExpanded ? (
                <>
                    <div className="checkbox-wrapper-12">
                        <div className="cbx">
                            <input 
                                id={`cbx-${task.taskKey}`} 
                                type="checkbox" 
                                checked={task.isCompleted} 
                                onChange={() => toggleTaskCompletion(task.taskKey)} 
                            />
                            <label htmlFor={`cbx-${task.taskKey}`}></label>
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                                <path d="M2 8.36364L6.23077 12L13 2"></path>
                            </svg>
                        </div>
                    </div>

                    <p className={`task-name ${task.isCompleted ? "completed" : ""}`}>
                        <span className="task-name-tooltip">
                            {task.taskName.length > 30 ? task.taskName.slice(0, 30) + "..." : task.taskName}
                        </span>
                    </p>
                    <div className={`tododescription ${task.isCompleted ? "completed" : ""}`}>
                        <span className="description-tooltip">
                            {task.taskDescription.length > 35 ? task.taskDescription.slice(0, 35) + "..." : task.taskDescription}
                        </span>
                    </div>
                    <div id="todocalendar" className={task.isCompleted ? "completed" : ""}>
                        <box-icon name="calendar" size="15px"></box-icon>
                        {task.dueDate}
                    </div>
                    <div id="allIcons">
                        <box-icon name="pencil" size="18px" onClick={() => {
                            setEditingTask(task);
                            setTaskPanel(true);
                        }}></box-icon>
                        <box-icon name="trash" size="18px" onClick={() => deleteTask(task.taskKey)}></box-icon>
                        <box-icon 
                            type="solid" 
                            name="chevron-down" 
                            size="18px" 
                            onClick={handleExpandToggle} 
                        ></box-icon>
                    </div>
                </>
            ) : (
                <div id="expandedToDo" className="expanded">
                    <div id="expandedHeader">
                        <div id="expandedName">{task.taskName}</div>
                        <div id="expandedDate">
                            <box-icon name="calendar" size="20px"></box-icon>
                            {task.dueDate}
                        </div>
                    </div>
                    <div id="expandedDescription">{task.taskDescription}</div>
                    <br></br>
                    <div id="expandedIcons">
                        <box-icon name="pencil" size="18px" onClick={() => {
                            setEditingTask(task);
                            setTaskPanel(true);
                        }}></box-icon>
                        <box-icon name="trash" size="18px" onClick={() => deleteTask(task.taskKey)}></box-icon>
                        <box-icon 
                            type="solid" 
                            name="chevron-down" 
                            size="18px" 
                            rotate="180" 
                            onClick={handleExpandToggle}
                        ></box-icon>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
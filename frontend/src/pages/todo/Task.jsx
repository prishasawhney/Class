import React, { useState } from 'react';
import "boxicons";
import "./Todo.css";

const ToDoItem = ({ task, setTaskPanel, setEditingTask, deleteTask, toggleTaskCompletion }) => {
    const [expand, setExpand] = useState(false); 

    return (
        <div className="newtodo">
            <div className="taskTypeStrip" style={{ background: task.taskColor }}></div>
            {!expand && (
                <>
                    <div class="checkbox-wrapper-12">
                        <div class="cbx">
                            <input id="cbx-12" type="checkbox" checked={task.isCompleted} onChange={toggleTaskCompletion} />
                            <label for="cbx-12"></label>
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                                <path d="M2 8.36364L6.23077 12L13 2"></path>
                            </svg>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="goo-12">
                                    <feGaussianBlur
                                        in="SourceGraphic"
                                        stdDeviation="4"
                                        result="blur"
                                    ></feGaussianBlur>
                                    <feColorMatrix
                                        in="blur"
                                        mode="matrix"
                                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                        result="goo-12"
                                    ></feColorMatrix>
                                    <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                                </filter>
                            </defs>
                        </svg>
                    </div>


                    {/*  */}
                    <p className={`task-name ${task.isCompleted ? "completed" : ""}`}>
                        <span className="task-name-tooltip">
                            {task.taskName.length > 10 ? task.taskName.slice(0, 30) + "..." : task.taskName}
                        </span>
                    </p>
                    <div className={`tododescription ${task.isCompleted ? "completed" : ""}`}>
                        <span className="description-tooltip">
                            {task.taskDescription.length > 15 ? task.taskDescription.slice(0, 35) + "..." : task.taskDescription}
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
                        <box-icon name="trash" size="18px" onClick={deleteTask}></box-icon>
                        <box-icon type="solid" name="chevron-down" size="18px" onClick={() => setExpand(prev => !prev)}></box-icon>
                    </div>
                </>
            )}
            {expand && (
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
                        <box-icon name="trash" size="18px" onClick={deleteTask}></box-icon>
                        <box-icon type="solid" name="chevron-down" size="18px" rotate="180" onClick={() => setExpand(prev => !prev)}></box-icon>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ToDoItem;

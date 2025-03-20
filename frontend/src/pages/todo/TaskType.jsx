import React, { useState, useEffect, useRef } from "react";
import "./Todo.css";
import "boxicons";

const TaskType = ({taskKey, taskName, taskColor, deleteTaskType, taskCount})=>{
    return (
        <div className="lists" >
            <div className="color" style={{ background: taskColor }}></div>
            <li key = {taskKey}>{taskName}</li>
            <div className="number">{taskCount}</div>
            <box-icon class="taskTypeDelete" name='trash' size="20px" onClick={deleteTaskType}></box-icon>
        </div>
    )
};

export default TaskType;

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TaskCard from './TaskCard';
import { useTasks } from "../../contexts/TaskContext";

export default function TaskCardContainer(){
    const { tasks, setTasks } = useTasks();
    const getTop5TasksByDate = (tasks) => {
        return tasks
          .filter((task) => !task.isCompleted) // Filter out completed tasks
          .sort((a, b) => {
            const [dayA, monthA, yearA] = a.dueDate.split("-");
            const [dayB, monthB, yearB] = b.dueDate.split("-");
            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateA - dateB;
          })
          .slice(0, 5); // Retain only the first 5 tasks
      };
    return ( 
        <Paper 
        sx = {{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '10px',
            right: '0',
            height: '90%',
            width: '35%',
            borderRadius: '10px',
            background:'#5680e9',
            color:'white'
        }}
        >
        <Typography variant='h6'
            sx = {{
                p: 1
            }}
        >
        <span id="UpcomingTasks">Upcoming Tasks</span>
        </Typography>
        {tasks.length === 0 ? (
                <Typography variant='body1' sx={{ p: 2, color:'#ffffff' }}>
                    Hooray! No tasks to tackle right now. Enjoy the break!
                </Typography>
            ) : (
                getTop5TasksByDate(tasks).map((task) => (
                    <TaskCard 
                        taskKey={task.taskKey} // Add a unique key for each task
                        taskName={task.taskName} 
                        taskDescription={task.taskDescription} 
                        dueDate={task.dueDate}
                    />
                ))
            )}
        </Paper>
    );
};
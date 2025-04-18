import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useTasks } from "../../contexts/TaskContext";
import { useLocation, useNavigate } from "react-router-dom";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '98%',
});

const formatDate = (date) => {
  const d = new Date(date);
  return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleDateString();
};

function TaskCard({ taskKey, taskName, taskDescription, dueDate }) {
  const { setOpenTaskKey, toggleTaskCompletion } = useTasks();
  const navigate=useNavigate();

  const handleClick = () => {
    setOpenTaskKey(taskKey);
    setTimeout(() => {
      navigate("/todo"); 
    }, 100);
  };

  return (
    <Paper
      sx={{
        p: 1,
        marginBottom: 1,
        width: '95%',
        height: 53,
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '10px'
      }}
    >
      <Grid container spacing={1}>
        <Grid item onClick={() => toggleTaskCompletion(taskKey)}>
          <ButtonBase sx={{ width: 50, height: 50 }}>
            <TaskAltIcon sx={{ fill: "#184ccf" }} />
          </ButtonBase>
        </Grid>

        <Grid item xs={12} sm container onClick={handleClick}>
          <Grid item xs container direction="column">
            <Grid item xs>
              <Typography variant="subtitle2" component="div">
                {taskName.length > 25 ? taskName.slice(0, 22) + "..." : taskName}
              </Typography>
              <Typography variant="caption">
                {taskDescription.length > 20 ? taskDescription.slice(0, 20) + '...' : taskDescription}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="caption" component="div">
              Due: {dueDate}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TaskCard; 

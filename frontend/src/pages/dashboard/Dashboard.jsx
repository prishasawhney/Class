import React, { useState, useEffect } from "react";
import TaskCardContainer from "./TaskCardContainer";
import MedalsComponent from "./MedalsComponent.jsx";
import "./Dashboard.css";
import owlImage from "../../assets/dashboardOwl.png";
import fire from "../../assets/fire.gif";
import fire1 from "../../assets/fire1.gif";
import bullseye from "../../assets/mission.gif";
// import { readTodos, readTaskType } from "../../API/todo.api.js";
// import { readNotes } from "../../API/note.api.js";
import { Link } from "react-router-dom";
import { quotes } from "../../data/Data.js";
// import { completeTodo } from "../../API/todo.api.js";
import { LineChart } from '@mui/x-charts/LineChart';
import { useError } from "../../contexts/ErrorContext.js";

const loadLordIconScript = () => {
  const script = document.createElement("script");
  script.src = "https://cdn.lordicon.com/lordicon.js";
  script.async = true;
  document.body.appendChild(script);
};

const Dashboard = ({
  username,
  setUpcoming,
  setUpcomingButton
}) => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState(""); 
  const [streak, setStreak] = useState(27);
  const [learningStreak, setLearningStreak] = useState(15);
  const [streakData, setStreakData] = useState([1, 9, 0, 17, 0, 2, 0, 27]);
  const { showError } = useError();

  useEffect(() => {
    loadLordIconScript();
    // loadTasks(username);
    // loadTaskTypeList(username);
    // loadNotes(username);
    getRandomQuote(quotes);
    // setUpcoming(false);
    // setUpcomingButton(false);

  }, []);

  // const loadTasks = async (username) => {
  //   try {
  //     const todos = await readTodos(username);
  //     const mappedTasks = todos.map((task) => {
  //       return {
  //         taskKey: task.taskKey,
  //         taskName: task.taskName,
  //         taskDescription: task.taskDescription,

  //         dueDate: task.dueDate,
  //         taskColor: task.taskColor,
  //         taskType: task.taskType,
  //         isCompleted: task.isCompleted,
  //       };
  //     });
  //     setTasks(mappedTasks);
  //   } catch (error) {
  //     console.error("Error loading tasks:", error);
  //   }
  // };

  // const loadTaskTypeList = async (username) => {
  //   try {
  //     const taskTypes = await readTaskType(username);
  //     const mappedTaskTypeList = taskTypes.map((taskType) => {
  //       return {
  //         taskTypeKey: taskType.taskTypeKey,
  //         taskTypeName: taskType.taskTypeName,
  //         taskColor: taskType.taskTypeColor,
  //       };
  //     });
  //     setTaskTypeList(mappedTaskTypeList);
  //   } catch (error) {
  //     console.error("Error loading task types:", error);
  //   }
  // };

  // const loadNotes = async (username) => {
  //   try {
  //     const notesList = await readNotes(username);
  //     const mappedNotesList = notesList.map((note) => {
  //       return {
  //         noteKey: note.noteKey,
  //         noteTitle: note.noteTitle,
  //         noteText: note.noteText,
  //         creationDate: note.creationDate
  //       };
  //     });
  //     setNotes(mappedNotesList);
  //   } catch (error) {
  //     console.error("Error loading task types:", error);
  //   }
  // };

  const getRandomQuote = (quotesArray) => {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    const randomQuote = quotesArray[randomIndex];
    setAuthor(randomQuote.author);
    setQuote(randomQuote.quote);
  };

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day); // Month is zero-indexed
  };

  // const toggleComplete = async (taskKey) => {
  //   let currentCompletionStatus = tasks.filter(
  //     (task) => task.taskKey === taskKey
  //   ).isCompleted;
  //   const todo = {
  //     username: username,
  //     taskKey: taskKey,
  //     isCompleted: !currentCompletionStatus,
  //   };
  //   // const response = await completeTodo(todo);
  //   setTasks(
  //     tasks.map((task) =>
  //       task.taskKey === taskKey
  //         ? { ...task, isCompleted: !task.isCompleted }
  //         : task
  //     )
  //   );
  // };

  return (
    <>
      <div id="dashBoardMain">
        <div id="welcomeCard">
          <div id="Welcomeuser">Welcome {username}!</div>
          <div id="Quote">
            <span id="quoteText">{quote}</span> <br></br>
            <span id="quoteAuthor">By {author}</span>
            <div id="position" style={{ position: "absolute", top: "10px", right: "10px" }}>
              <div id="streak">
                <img src={fire1}></img>
                <span>{streak}</span>
              </div>
            </div>
          </div>
          <img className="owlImage" src={owlImage}></img>
        </div>
        <div id="bottom">
          <div style={{ display: "flex", height: "40%", gap: "5px", marginTop: "10px" }}>
            <div id="streakGraph">
              <div style={{ display: "flex", alignItems: "center", fontWeight: "600", gap:"5px" }}>
                <img src={bullseye} style={{ height: "30px" }}></img>
                Streak Stats: Climb or Crash?
              </div>
              <LineChart
                xAxis={[
                  {
                    scaleType: "point",
                    data: streakData.map((_, index) => index), // Ensuring x-axis has valid data
                    valueFormatter: () => "•", // Replace numbers with dots
                  },
                ]}
                series={[
                  { curve: "linear", data: streakData, showMark: false, color: "#003366" }
                ]}
              />



            </div>
            <div id="learningStreak">
              <div className="streak-container">
                <h3>🔥 Daily Learning Streak Challenge</h3>
                <div className="streak-info">
                  <span>Current Streak: <strong>{learningStreak} days</strong></span>
                </div>
                <button className="streak-btn" onClick={() => { showError("This feature is coming soon! Stay tuned!"); }}>Take Today's Question</button>
              </div>
            </div>
          </div>
          <div id="rectangle">
            <MedalsComponent />
          </div>
          <div id="bottomTasks">
            <TaskCardContainer
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

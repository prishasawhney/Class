import React from "react";
import './App.css';
import ToDoPage from "../src/pages/todo/Todo";
import { ErrorProvider } from "./contexts/ErrorContext";
import Alert from "./components/alert/Alert";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <ErrorProvider>
      <div className="app-container">
        <Navbar/>
        <Alert />
        <div className="content-container">
          <ToDoPage />
        </div>
      </div>
    </ErrorProvider>
  );
}

export default App;

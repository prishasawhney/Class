import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ToDoPage from "../src/pages/todo/Todo";
import { ErrorProvider } from "./contexts/ErrorContext";
import { TaskProvider } from "./contexts/TaskContexts";
import Alert from "./components/alert/Alert";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <ErrorProvider>
      <TaskProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <Alert />
            <div className="content-container">
              <Switch>
                <Route path="/todo" component={ToDoPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </TaskProvider>
    </ErrorProvider>
  );
}

export default App;

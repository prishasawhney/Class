import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom"; 
import LoginSignupPage from "../src/pages/loginSignupPage/LoginSignup";
import ToDoPage from "../src/pages/todo/Todo";
import CommunityPage from "../src/pages/community/CommunityPage";
import ResumeScorer from "../src/pages/resumeScorer/ResumeScorer";
import InterviewAnalyzer from "../src/pages/interview/InterviewPreparationAnalyzer";
import ChatBot from "../src/components/chatbot/ChatBot";
import NotesPage from "../src/pages/notes/NotesPage";
import ChatPage from "../src/pages/chat/ChatWithImage";
import Dashboard from "../src/pages/dashboard/Dashboard";
import { ErrorProvider } from "./contexts/ErrorContext";
import { TaskProvider } from "./contexts/TaskContext";
import { NotesProvider } from "./contexts/NotesContext";
import { PostProvider } from "./contexts/PostsContext";
import { SongsProvider } from "./contexts/SongsContext";
import Alert from "./components/alert/Alert";
import Navbar from "./components/navbar/Navbar";

function App({ location }) {
  const username = "NewUser";
  const shouldShowSideNav = !['/', '/login-signup'].includes(location.pathname);
  const noChatbotPaths = !['/', '/login-signup'].includes(location.pathname);

  return (
    <ErrorProvider>
      <TaskProvider>
        <NotesProvider>
          <PostProvider>
            <SongsProvider>
              <Router>
                <div className="app-container">
                  {shouldShowSideNav && <Navbar />}
                  <Alert />
                  <div className="content-container">
                    <Switch>
                      <Route path="/login-signup" component={LoginSignupPage} />
                      <Route path="/todo" component={ToDoPage} />
                      <Route path="/community" render={(props) => <CommunityPage {...props} username={username} />} />
                      <Route path="/resume" component={ResumeScorer} />
                      <Route path="/interview" component={InterviewAnalyzer} />
                      <Route path="/notes" component={NotesPage} />
                      <Route path="/chat" component={ChatPage} />
                      <Route path="/dashboard" component={Dashboard} />
                    </Switch>
                    {noChatbotPaths && <ChatBot />}
                  </div>
                </div>
              </Router>
            </SongsProvider>
          </PostProvider>
        </NotesProvider>
      </TaskProvider>
    </ErrorProvider>
  );
}

// Wrap App with withRouter to inject location as a prop
export default withRouter(App);

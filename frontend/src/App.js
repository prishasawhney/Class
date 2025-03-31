import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ToDoPage from "../src/pages/todo/Todo";
import CommunityPage from "../src/pages/community/CommunityPage";
import ResumeScorer from "../src/pages/resumeScorer/ResumeScorer";
import InterviewAnalyzer from "../src/pages/interview/InterviewPreparationAnalyzer";
import ChatBot from "../src/components/chatbot/ChatBot";
import NotesPage from "../src/pages/notes/NotesPage";
import ChatPage from "../src/pages/chat/ChatWithImage";
import Dashboard from "../src/pages/dashboard/Dashboard";
import Brain from "../src/pages/brain/BrainPage";
import { ErrorProvider } from "./contexts/ErrorContext";
import { TaskProvider } from "./contexts/TaskContext";
import { NotesProvider } from "./contexts/NotesContext";
import { PostProvider } from "./contexts/PostsContext";
import { SongsProvider } from "./contexts/SongsContext";
import { FlashcardProvider } from "./contexts/FlashcardContext";
import Alert from "./components/alert/Alert";
import Navbar from "./components/navbar/Navbar";

function App() {
  const username = "NewUser";
  return (
    <ErrorProvider>
      <TaskProvider>
        <NotesProvider>
          <PostProvider>
            <SongsProvider>
              <Router>
                <div className="app-container">
                  <Navbar/>
                  <Alert/>
                  <div className="content-container">
                    <Switch>
                      <Route path="/todo" component={ToDoPage} />
                      <Route path="/community" render={(props) => <CommunityPage {...props} username={username} />} />
                      <Route path="/resume" component={ResumeScorer} />
                      <Route path="/interview" component={InterviewAnalyzer} />
                      <Route path="/notes" component={NotesPage} />
                      <Route path="/chat" component={ChatPage} />
                      <Route path="/dashboard" component={Dashboard} />
                      <FlashcardProvider>
                        <Route path="/brain" component={Brain} />
                      </FlashcardProvider>
                    </Switch>
                    <ChatBot />
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

export default App;

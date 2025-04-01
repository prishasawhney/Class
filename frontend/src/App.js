import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LoginSignupPage from "../src/pages/LoginSignupPage/LoginSignup";
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
import { TaskTypeProvider } from "./contexts/TaskTypeContext";
import { TaskTypeProvider } from "./contexts/TaskTypeContext";
import { NotesProvider } from "./contexts/NotesContext";
import { PostProvider } from "./contexts/PostsContext";
import { SongsProvider } from "./contexts/SongsContext";
import { FlashcardProvider } from "./contexts/FlashcardContext";
import Alert from "./components/alert/Alert";
import Navbar from "./components/navbar/Navbar";

function AppContent() {
  const location = useLocation();
  const username = "";

  const shouldShowSideNav = !['/', '/login-signup'].includes(location.pathname);
  const noChatbotPaths = !['/', '/login-signup'].includes(location.pathname);

  return (
    <div className="app-container">
      {shouldShowSideNav && <Navbar />}
      <Alert />
      <div className="content-container">
        <Routes>
          <Route path="/login-signup" element={<LoginSignupPage />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/community" element={<CommunityPage username={username} />} />
          <Route path="/resume" element={<ResumeScorer />} />
          <Route path="/interview" element={<InterviewAnalyzer />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/dashboard" element={<Dashboard username={username}/>} />
          <Route path="/brain" element={<Brain/>} />
        </Routes>
        {noChatbotPaths && <ChatBot />}
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorProvider>
      <TaskProvider>
        <TaskTypeProvider>
        <TaskTypeProvider>
        <NotesProvider>
          <PostProvider>
              <FlashcardProvider>
              <Router>
                <AppContent />
              </Router>
              </FlashcardProvider>
          </PostProvider>
        </NotesProvider>
        </TaskTypeProvider>
        </TaskTypeProvider>
      </TaskProvider>
    </ErrorProvider>
  );
}

export default App;

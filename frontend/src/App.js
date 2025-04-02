import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LoginSignupPage from "../src/pages/LoginSignupPage/LoginSignup";
import ForgotPassword from "../src/pages/LoginSignupPage/ForgotPass";
import LandingPage from "../src/pages/landingpage/LandingPage";
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

function AppContent() {
  const location = useLocation();
  const username = "NewUser";

  const shouldShowSideNav = !['/','/forgotpass', '/login-signup'].includes(location.pathname);
  const noChatbotPaths = !['/', '/login-signup'].includes(location.pathname);

  return (
    <div className="app-container">
      {shouldShowSideNav && <Navbar />}
      <Alert />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/forgotpass" element={<ForgotPassword/>}/>
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
        <NotesProvider>
          <PostProvider>
            <SongsProvider>
              <FlashcardProvider>
              <Router>
                <AppContent />
              </Router>
              </FlashcardProvider>
            </SongsProvider>
          </PostProvider>
        </NotesProvider>
      </TaskProvider>
    </ErrorProvider>
  );
}

export default App;

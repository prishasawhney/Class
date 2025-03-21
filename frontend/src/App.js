import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./pages/LoginSignupPage/LoginSignup";
import Flashcards from "./pages/Flashcards/FlashcardPage";

function App() {
  const [error, setError] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Flashcards setError={setError} error={error} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

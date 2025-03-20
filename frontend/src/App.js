import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./pages/LoginSignupPage/LoginSignup";

function App() {
  const [error, setError] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginSignup setError={setError} error={error} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

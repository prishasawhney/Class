import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import "boxicons";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";
import { useAuth } from "../../contexts/AuthContext"; 

const LoginSignup = () => {
  const { error, showError } = useError();
  const { loginUser } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPassword2, setSignupPassword2] = useState("");

  const [shake, setShake] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    if (error) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [error]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: loginEmail,
        password: loginPassword,
      });
      loginUser(response.data.username);
      navigate("/dashboard");
      // Handle successful login, e.g., store token, redirect, etc.
    } catch (err) {
      console.error("Login failed:", err);
      showError("Invalid credentials"); // Update error state
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (signupPassword !== signupPassword2) {
        showError("Passwords do not match");
        return;
    }
    try {
        const userData = { email: signupEmail, username: signupUsername, password: signupPassword };
        const response = await axios.post('http://localhost:8000/signup', userData);
        loginUser(response.data.username);
        navigate("/dashboard");
    } catch (err) {
        console.error('Signup failed:', err.response?.data?.detail || err.message);
        showError(err.response?.data?.detail || 'Failed to create an account. Please try again.');
    }
};


  const moveSliderLeft = () => {
    document
      .getElementById("overlay")
      .classList.remove("overlay-moveHalfRight");
    document
      .getElementById("overlayInner")
      .classList.remove("overlayInner-moveHalfLeft");
    document.getElementById("signUpForm").classList.remove("shiftLeft");

    document.getElementById("overlay").classList.add("overlay-moveHalfLeft");
    document
      .getElementById("overlayInner")
      .classList.add("overlayInner-moveHalfRight");
    document.getElementById("signInForm").classList.add("shiftRight");
  };
  const moveSliderRight = () => {
    document.getElementById("overlay").classList.remove("overlay-moveHalfLeft");
    document
      .getElementById("overlayInner")
      .classList.remove("overlayInner-moveHalfRight");
    document.getElementById("signInForm").classList.remove("shiftRight");

    document.getElementById("overlay").classList.add("overlay-moveHalfRight");
    document
      .getElementById("overlayInner")
      .classList.add("overlayInner-moveHalfLeft");
    document.getElementById("signUpForm").classList.add("shiftLeft");
  };
  return (
    <div className="container">
      <div id="signInSignUpBox">
        <div id="overlay">
          <div id="overlayInner">
            <div id="signUp">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info.
              </p>
              <button onClick={moveSliderRight}>Sign In</button>
            </div>
            <div id="signIn">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us.</p>
              <button onClick={moveSliderLeft}>Sign Up</button>
            </div>
          </div>
        </div>
        <div id="forms">
          <div id="signInForm" className="shiftRight">
            <div className="holder">
              <h1>Sign in</h1>
              <div id="social-media-holder">
                <button href="#" className="social-media-button">
                  <box-icon type="logo" name="meta" color="#ffffff"></box-icon>
                </button>
                <button href="#" className="social-media-button">
                  <box-icon
                    name="google"
                    type="logo"
                    color="#ffffff"
                  ></box-icon>
                </button>
                <button href="#" className="social-media-button">
                  <box-icon
                    type="logo"
                    name="twitter"
                    color="#ffffff"
                  ></box-icon>
                </button>
              </div>
              <p>or use your account</p>

              <form action="" method="POST" onSubmit={handleLogin}>
                <div className="input1">
                  <box-icon type="solid" name="user-circle"></box-icon>
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    name="email_id"
                    onChange={(event) => setLoginEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="input1">
                  <box-icon type="solid" name="lock"></box-icon>
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    name="pass"
                    onChange={(event) => setLoginPassword(event.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={`signup-signin-button ${shake ? "shake" : ""}`}>
                  Sign In
                </button>
                <a href="/forgotpass" id="forgot-password">Forgot your password?</a>
              </form>
            </div>
          </div>
          <div id="signUpForm">
            <div className="holder">
              <h1>Create Account</h1>
              <div id="social-media-holder">
                <button href="#" className="social-media-button">
                  <box-icon type="logo" name="meta" color="#ffffff"></box-icon>
                </button>
                <button href="#" className="social-media-button">
                  <box-icon
                    name="google"
                    type="logo"
                    color="#ffffff"
                  ></box-icon>
                </button>
                <button href="#" className="social-media-button">
                  <box-icon
                    type="logo"
                    name="twitter"
                    color="#ffffff"
                  ></box-icon>
                </button>
              </div>
              <p>or use your email for registration</p>

              <form method="POST" action="" onSubmit={handleSignup}>
                <div className="input1">
                  <box-icon type="solid" name="user-circle"></box-icon>
                  <input
                    type="text"
                    placeholder="Name"
                    value={signupUsername}
                    name="setuname"
                    onChange={(e) => setSignupUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input1">
                  <box-icon type="solid" name="envelope"></box-icon>
                  <input
                    type="email"
                    placeholder="Email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    value={signupEmail}
                    name="setemail_id"
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input1">
                  <box-icon type="solid" name="lock"></box-icon>
                  <input
                    type="password"
                    placeholder="Password"
                    name="setpass"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                <div class="input1">
                  <box-icon type="solid" name="lock"></box-icon>
                  <input
                    className="cp"
                    type="password"
                    placeholder="Confirm Password"
                    value={signupPassword2}
                    name="setpass2"
                    onChange={(e) => setSignupPassword2(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={`signup-signin-button ${shake ? "shake" : ""}`}>Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default LoginSignup; 
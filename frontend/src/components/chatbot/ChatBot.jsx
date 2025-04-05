import React, { useState, useRef, useEffect } from "react";
import "boxicons";
import "./ChatBot.css";
import ChatBubble from "./ChatBubble";
import { chatWithGemini } from "../../api/minichatbot.api";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TaskContext";
import { useTaskTypes } from "../../contexts/TaskTypeContext";

const slashCommands = [
  { command: "/manage my deadlines", description: "Structures your tasks for smooth and timely completion.", requiresInput: false },
  { command: "/roadmap", description: "Creates a step-by-step plan to master any topic.", requiresInput: true },
];


const Chatbot = () => {
  const { username } = useAuth();
  const { tasks, setTasks } = useTasks();
  const { taskTypes, setTaskTypes } = useTaskTypes();
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState([]);
  const [showCommands, setShowCommands] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [requiresInput, setRequiresInput] = useState(false);

  const messagesEndRef = useRef(null);

  const generateChatbotResponse = async (question) => {
    const query = { question: question, username: username };
    const response = await chatWithGemini(query);
    if (question.toLowerCase().includes("/roadmap")) {
      setTasks([...tasks, response.task]);
      if (response.found === false && response.taskType) {
        // ✅ Add new task type to frontend state
        setTaskTypes([...taskTypes, response.taskType]);
      }
    }
    return response.response;
  };

  useEffect(() => {
    // Initial bot message introducing itself
    setChatHistory([
      { sender: "chatbot", message: "Hello, I'm G.U.I.D.E. - Your General User’s Intelligent Digital Expert! I’m here to assist you with anything you need. Feel free to ask me questions or use commands to explore my features!" }
    ]);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleQuestion = async (event) => {
    event.preventDefault();
    if (userQuestion.trim() === "") return;

    const newUserChatHistory = [
      ...chatHistory,
      { sender: "user", message: userQuestion },
    ];
    setChatHistory(newUserChatHistory);

    try {
      setLoading(true);
      const question = userQuestion;
      setUserQuestion("");
      const chatbotResponse = await generateChatbotResponse(question);
      const newBotChatHistory = [
        ...newUserChatHistory,
        { sender: "chatbot", message: chatbotResponse },
      ];
      setChatHistory(newBotChatHistory);
    } catch (error) {
      const chatbotResponse =
        "Failed to get chatbot response. Please try again later.";
      const newBotChatHistory = [
        ...newUserChatHistory,
        { sender: "chatbot", message: chatbotResponse },
      ];
      setChatHistory(newBotChatHistory);
      setUserQuestion("");
      console.error("Failed to get chatbot response:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleChatboxToggle = () => setIsExpanded(!isExpanded);

  const handleInputChange = (event) => {
    let input = event.target.value;
    setUserQuestion(input);

    if (input.startsWith("/")) {
      const query = input.slice(1).toLowerCase();
      const filtered = slashCommands.filter(cmd => cmd.command.slice(1).startsWith(query));
      setFilteredCommands(filtered);
      setShowCommands(filtered.length > 0);
    } else {
      setShowCommands(false);
    }
  };

  const handleCommandSelection = (command) => {
    setShowCommands(false);
    if (command.requiresInput) {
      const updatedQuestion = `${command.command} <>`;
      setUserQuestion(updatedQuestion);
      setRequiresInput(true);
      setTimeout(() => {
        const input = document.querySelector(".send-input");
        if (input) {
          const pos = updatedQuestion.indexOf("<>");
          input.setSelectionRange(pos + 1, pos + 1);
          input.focus();
        }
      }, 10);
    } else {
      setUserQuestion(command.command);
      setRequiresInput(false);
    }
  };

  const handleKeyDown = (e) => {
    if (showCommands) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission
  
        if (filteredCommands[selectedIndex]) {
          handleCommandSelection(filteredCommands[selectedIndex]);
        }
      }
    } else if (requiresInput && e.key === "Backspace" && userQuestion.endsWith("<>")) {
      setUserQuestion(userQuestion.slice(0, -3)); // Remove `<>` if backspace is pressed
      setRequiresInput(false);
    }
  };

  return (
    <div className={`containerchat ${isExpanded ? 'expanded' : 'collapsed'}`} onClick={!isExpanded ? handleChatboxToggle : null}>
      <div className="nav-barchat">
        <a>G.U.I.D.E.</a>
        <div className={`close ${isExpanded ? 'expanded' : 'collapsed'}`} onClick={handleChatboxToggle}>
          <div className="line one"></div>
          <div className="line two"></div>
        </div>
      </div>

      <div className="messages-area">
        <div id="circles" style={{ overflow: 'hidden' }}>
          <div id="circle1"></div>
          <div id="circle2"></div>
        </div>
        <div id="chats">
          {chatHistory.map((chat, index) => (
            <ChatBubble key={index} sender={chat.sender} message={chat.message} username={username} />
          ))}
          <div ref={messagesEndRef} />
          {loading && (
            <div id="loader">
              <ThreeDots height="40px" width="40px" color="#4F29F0" ariaLabel="loading" />
            </div>
          )}
        </div>
      </div>

      <div className="sender-area">
        <form onSubmit={handleQuestion}>
          <div className="input-place">
            <input
              type="text"
              name="userQuestion"
              value={userQuestion}
              placeholder="Send a message..."
              className="send-input"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />

            {showCommands && (
              <ul className="command-dropdown">
                {filteredCommands.map((cmd, index) => (
                  <li
                    key={cmd.command}
                    className={`command-item ${index === selectedIndex ? "selected" : ""}`}
                    onClick={() => handleCommandSelection(cmd)}
                  >
                    <strong>{cmd.command}</strong><br/>
                    <span>{cmd.description}</span>
                  </li>
                ))}
              </ul>
            )}

            <button className="send" type="submit">
              <svg className="send-icon" version="1.1" viewBox="0 0 512 512">
                <g><path fill="#6B6C7B" d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"></path></g>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;

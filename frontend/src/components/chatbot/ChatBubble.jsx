import React from 'react';
import "boxicons";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatBubble = ({ sender, message, username }) => {
  const isUser = sender === "user";
  const firstLetter = username ? username.charAt(0).toUpperCase() : "?"; 
  
  const letterColors = (letter) => {
    const colors = {
      A: "#D3C047", B: "#D99228", C: "#C67947", D: "#D94A28", E: "#D94337",
      F: "#CD3F66", G: "#E2597D", H: "#D36576", I: "#EDA29B", J: "#C84F8B",
      K: "#A659C9", L: "#822436", M: "#632838", N: "#6CD2DF", O: "#27A1C4",
      P: "#2F83DB", Q: "#2C44BE", R: "#27455F", S: "#57311C", T: "#121212",
      U: "#8ED029", V: "#2DAF27", W: "#279479", X: "#2F8347", Y: "#6B7C46",
      Z: "#324317"
    };
    return colors[letter] || "#888";
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '5px',
        width: 'fit-content',
        marginLeft: isUser ? 'auto' : '',
        alignItems: 'start'
      }}
    >
      {!isUser && (
        <div id="botBubble" className="chatbot"></div>
      )}
      
      <div id="chatbubble" className={isUser ? "user" : "chatbot"}>
        <ReactMarkdown children={message} remarkPlugins={[remarkGfm]} />
      </div>

      {isUser && (
        <div 
          id="userBubble" 
          className="user"
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: letterColors(firstLetter),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '14px'
          }}
        >
          {firstLetter}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;

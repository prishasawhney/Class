import React, { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import Flashcard from "./Flashcard.jsx";
import "./BrainPage.css";
import { useBrain } from "../../contexts/BrainContext"; // Importing context

const FlashcardContainer = () => {
  const colors = ["#ac92eb", "#4fc1e8", "#a0d568", "#ffce54", "#ed5564"];
  const darkerColors = ["#9474c4", "#41a3c0", "#88b85a", "#d4a647", "#c24651"];
  const [loading, setLoading] = useState(false);
  const { flashcard } = useBrain(); // Accessing flashcard from context
  

  return (
    <div id="flashcard-container">
      {loading ? (
        <div id="loader">
          <ThreeDots height={80} width={80} color="#0579CF" />
        </div>
      ) : (
        flashcard.map((card, index) => (
          <Flashcard
            key={index}
            question={card.question}
            answer={card.answer}
            hint={card.hint}
            color={colors[index % colors.length]}
            darkerColors={darkerColors[index % darkerColors.length]}
          />
        ))
      )}
    </div>
  );
};

export default FlashcardContainer;

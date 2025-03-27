import React, { useState } from "react";
import "./Fluid.css";
import SummarizedNote from "./SummarizedNote";
import FlashcardContainer from "./FlashcardContainer";
import Lottie from "lottie-react";
import animationData from "../../assets/comingsoon.json";

function Fluid({ flashcards, summary }) {
  const [activeComponent, setActiveComponent] = useState("Component1");
  const [activeButton, setActiveButton] = useState("button1");

  const handleButtonClick = (component, buttonId) => {
    setActiveComponent(component);
    setActiveButton(buttonId);
  };

  const Component1 = () => <SummarizedNote summary={summary} />;
  const Component2 = () => <FlashcardContainer flashcards={flashcards} />;
  const Component3 = () => (
    <div id="animation-card">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );

  return (
    <div className="fluid-container">
      <div className="button-group">
        <button
          id="button1"
          onClick={() => handleButtonClick("Component1", "button1")}
          className={`liquid-button ${activeButton === "button1" ? "active" : ""}`}
        >
          SUMMARY
        </button>
        <button
          id="button2"
          onClick={() => handleButtonClick("Component2", "button2")}
          className={`liquid-button ${activeButton === "button2" ? "active" : ""}`}
        >
          FLASHCARDS
        </button>
        <button
          id="button3"
          onClick={() => handleButtonClick("Component3", "button3")}
          className={`liquid-button ${activeButton === "button3" ? "active" : ""}`}
        >
          MINDMAPS
        </button>
      </div>
      <div className="content-area">
        {activeComponent === "Component1" && <Component1 />}
        {activeComponent === "Component2" && <Component2 />}
        {activeComponent === "Component3" && <Component3 />}
      </div>
    </div>
  );
}

export default Fluid;

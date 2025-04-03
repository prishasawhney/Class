import React, { useState, useEffect } from "react";
import "./BrainPage.css";
import SummarizedNote from "./SummarizedNote";
import FlashcardContainer from "./FlashcardContainer";
import Lottie from "lottie-react";
import animationData from "../../assets/comingsoon.json";
import { useBrain } from "../../contexts/BrainContext";

function Fluid({ showFluid }) {
  const [activeComponent, setActiveComponent] = useState("Component1");
  const [activeButton, setActiveButton] = useState("button1");
  const [activeIndex, setActiveIndex] = useState(0);
  const { summary, flashcard } = useBrain(); // Importing flashcard from context

  const handleButtonClick = (component, buttonId) => {
    setActiveComponent(component);
    setActiveButton(buttonId);
  };

  const Component1 = () => <SummarizedNote />;
  const Component2 = () => <FlashcardContainer/>;
  const Component3 = () => (
    <div id="animation-card">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );

  const icons = [
    { name: "Summary", component: () => handleButtonClick("Component1", "button1") },
    { name: "Flashcards", component: () => handleButtonClick("Component2", "button2") },
    { name: "Mindmap", component: () => handleButtonClick("Component3", "button3") }
  ];

  useEffect(() => {
    const style = document.createElement("style");
    let styles = "";
    for (let i = 0; i < icons.length - 1; i++) {
      styles += `
        .navigation ul li:nth-child(${i + 2}).active1 ~ .indicator {
          transform: translateX(calc(150px * ${i + 1}));
        }
      `;
    }
    style.innerHTML = styles;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="fluid-container">
      <div className="navigation">
        <ul>
          {icons.map((icon, index) => (
            <li
              key={icon.name}
              className={index === activeIndex ? "active1" : ""}
              onClick={() => {
                setActiveIndex(index);
                icon.component();
                console.log("Summary:", summary);
                console.log("Flashcards:", flashcard);
              }}
            >
              <span href="#"  className="nav-link"  onClick={(e) => e.preventDefault()}>
                <div style={{position:"relative", top:"25px", left:"4px", cursor:"pointer"}} className={index === activeIndex ? "active12" : "nonActive"}>{icon.name}</div>
                <span className="icon"></span>
              </span>
            </li>
          ))}
          <div className="indicator"><span></span></div>
        </ul>
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

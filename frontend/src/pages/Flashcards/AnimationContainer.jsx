import React from "react";
import Lottie from 'lottie-react';
import animationData from '../../assets/stress.json';
import "./AnimationContainer.css"

const AnimationContainer = ({ onClick }) => {
  return (
    <div id="animation-card">
      <div id="animation-left">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div id="animation-right">
        <p>Still stressed about learning?</p>
        <p>Don't let anything stop you!</p>
        <button onClick={onClick}>Click for Instant Flashcards</button>
      </div>
    </div>
  );
};

export default AnimationContainer;

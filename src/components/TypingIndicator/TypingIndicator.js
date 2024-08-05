// TypingIndicator.js
import React from "react";
import "./TypingIndicator.css";

const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <span className="cyberai">CyberAI digitando</span>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default TypingIndicator;

// NeonButton.js
import React from 'react';
import './NeonButton.css';

const NeonButton = ({ label }:any) => {
  return (
    <button className="neon-button">
      <span className="neon-text">{label}</span>
      <span className="neon-border"></span>
      <span className="neon-spot"></span>
    </button>
  );
};

export default NeonButton;
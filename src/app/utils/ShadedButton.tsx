// ShadedButton.js
import React from 'react';
import './ShadedButton.css';

const ShadedButton = ({ label }:any) => {
  return (
    <button className="shaded-button">
      {label}
      <div className="shaded-border"></div>
    </button>
  );
};

export default ShadedButton;
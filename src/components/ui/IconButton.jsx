import React from 'react';

const IconButton = ({ icon, onClick, className = '', ariaLabel }) => {
  return (
    <button
      className={`icon-button ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default IconButton;

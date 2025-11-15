import React from 'react';
import IconButton from './IconButton';

const PanelHeader = ({ onClose }) => {
  return (
    <div className="panel-header">
      <h2 className="panel-title">UR Assistant</h2>
      <IconButton
        icon="✕"
        onClick={onClose}
        ariaLabel="Close panel"
        className="close-button"
      />
    </div>
  );
};

export default PanelHeader;

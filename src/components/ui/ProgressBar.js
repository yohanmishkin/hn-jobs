import React from 'react';

const ProgressBar = ({ complete, toComplete }) => {
  return (
    <div className="progress-container" data-testid="loading">
      <label htmlFor="progress-bar" className="progress-label">Loading</label>
      <progress 
        id="progress-bar" 
        max={toComplete}
        value={complete || 0}
      ></progress>
    </div>
  );
};

export default ProgressBar;
import React from 'react';

const ProgressBar = ({ complete, toComplete }) => {
  return (
    <div data-testid="loading">
      <label htmlFor="progress-bar" className="hidden">Listings loaded:</label>
      <progress 
        id="progress-bar" 
        max={toComplete}
        value={complete || 0}
      ></progress>
    </div>
  );
};

export default ProgressBar;
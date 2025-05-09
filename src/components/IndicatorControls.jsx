import React from 'react';

export default function IndicatorControls({ indicators, scores, onScoreChange }) {
  return (
    <div className="indicator-controls">
      {indicators.map(ind => (
        <div key={ind} className="indicator-list">
          <span className="indicator-name">{ind}</span>
          <div className="indicator-btns">
            <button 
              className={`indicator-up-btn ${scores[ind] === 1 ? 'selected' : ''}`}
              onClick={() => onScoreChange(ind, 1)}>
              Up
            </button>
            <button 
              className={`indicator-down-btn ${scores[ind] === -1 ? 'selected' : ''}`} 
              onClick={() => onScoreChange(ind, -1)}>
              Down
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
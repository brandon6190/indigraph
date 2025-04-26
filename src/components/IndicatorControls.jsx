import React from 'react';

export default function IndicatorControls({ indicators, scores, onScoreChange }) {
  return (
    <div className="indicator-list">
      {indicators.map(ind => (
        <div key={ind} className="indicator">
          <span>{ind}</span>
          <div className="indicator-btns">
            <button 
              className="indicator-up-btn" 
              onClick={() => onScoreChange(ind, 1)}>
              Up
            </button>
            <button 
              className="indicator-down-btn" 
              onClick={() => onScoreChange(ind, -1)}>
              Down
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
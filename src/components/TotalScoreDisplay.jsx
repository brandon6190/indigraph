import React from 'react';

export default function TotalScoreDisplay({ scores, onSubmit }) {
  const scoreValues = Object.values(scores);
  const total = scoreValues.length ? (scoreValues.reduce((acc, val) => acc + val, 0) / scoreValues.length).toFixed(2) : 0;
  
  return (
    <div className="total-score-display">
      <p className="score">Total Score: {total}</p>
      <button 
        className="submit-score-btn" 
        onClick={onSubmit}>
        Submit Score
      </button>
    </div>
  );
}
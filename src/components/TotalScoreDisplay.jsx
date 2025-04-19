// components/TotalScoreDisplay.jsx
import React from 'react';

export default function TotalScoreDisplay({ scores, onSubmit }) {
  const scoreValues = Object.values(scores);
  const total = scoreValues.length === 0 
  ? 0 
  : (scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length).toFixed(2);
  
  return (
    <div className="mt-4">
      <p className="text-lg font-semibold">Total Score: {total}</p>
      <button 
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded" 
        onClick={onSubmit}>
        Submit Score
      </button>
    </div>
  );
}
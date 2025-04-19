// components/IndicatorControls.jsx
import React from 'react';

export default function IndicatorControls({ indicators, scores, onScoreChange }) {
  return (
    <div className="space-y-2">
      {indicators.map(ind => (
        <div key={ind} className="flex justify-between items-center">
          <span>{ind}</span>
          <div className="space-x-2">
            <button 
              className="bg-green-500 text-white px-2 py-1 rounded" 
              onClick={() => onScoreChange(ind, 1)}>
              Up
            </button>
            <button 
              className="bg-red-500 text-white px-2 py-1 rounded" 
              onClick={() => onScoreChange(ind, -1)}>
              Down
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
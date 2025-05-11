import React from 'react';

export default function IndicatorControls({ indicators, scores, onScoreChange, onAddIndicator, onRemoveIndicator }) {
  const [newIndicator, setNewIndicator] = React.useState('');

  const handleAdd = () => {
    onAddIndicator(newIndicator);
    setNewIndicator('');
  };
  
  return (
    <div className="indicator-controls">
      <div className="indicator-add">
        <input 
          type="text" 
          value={newIndicator} 
          onChange={e => setNewIndicator(e.target.value)} 
          placeholder="Add Indicator" />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="indicator-list">
        {indicators.map(ind => (
          <div key={ind} className="indicator">
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
              <button 
                className="indicator-remove-btn" 
                onClick={() => onRemoveIndicator(ind)}>
                  ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
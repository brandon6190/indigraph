import React, { useState } from 'react';
import './App.css';

import IndicatorControls from './components/IndicatorControls';
import TotalScoreDisplay from './components/TotalScoreDisplay';
import DateCoinSelector from './components/DateCoinSelector';
import ScoreChart from './components/ScoreChart';

const INDICATORS = ['Aroon', 'DMI', 'MACD', 'Parabolic SAR', 'RSI', 'SMI Ergodic', 'Supertrend'];

export default function App() {
  const [scores, setScores] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [coin, setCoin] = useState('BTC');
  const [chartData, setChartData] = useState([]);

  const handleScoreChange = (indicator, value) => {
    setScores(prev => ({ ...prev, [indicator]: value }));
  };

  const handleSubmit = () => {
    if (!selectedDate) return;

    const values = Object.values(scores);

    const total = values.length ? (values.reduce((acc, val) => acc + val, 0) / values.length).toFixed(2) : 0;
        
    setChartData(prev => [...prev, { date: selectedDate, score: total }]);
    
    setScores({});
  };

  return (
    <div className="app">
      <div className="controls">
        <DateCoinSelector 
          selectedDate={selectedDate} 
          setSelectedDate={setSelectedDate} 
          coin={coin} 
          setCoin={setCoin} 
        />
        <IndicatorControls 
          indicators={INDICATORS} 
          scores={scores} 
          onScoreChange={handleScoreChange} 
        />
        <TotalScoreDisplay scores={scores} onSubmit={handleSubmit} />
      </div>
      <div className="score-chart">
        <ScoreChart data={chartData} />
      </div>
    </div>
  );
} 
import React, { useState, useEffect } from 'react';
import './App.css';

import IndicatorControls from './components/IndicatorControls';
import TotalScoreDisplay from './components/TotalScoreDisplay';
import DateSelector from './components/DateSelector';
import CoinSelector from './components/CoinSelector';
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
    //changing formats from selectedDate to match new date format from chartData state
    const parts = selectedDate.split('-');
    const formattedDate = parts.length > 1 ? `${parts[1]}/${parts[2]}/${parts[0]}` : selectedDate;
    
    setChartData(prev => {
      // checking if a date already exists in the chartData state
      const existingDate = prev.findIndex(data => data.date === formattedDate);
      const updatedData = [...prev];
      const newEntry = { date: formattedDate, score: total, indicators: scores, coin: coin };

      if (existingDate > -1) {
        updatedData[existingDate] = newEntry;
      } else {
        updatedData.push(newEntry);
      }

      const stored = JSON.parse(localStorage.getItem('chartData')) || {};
      stored[coin] = updatedData;
      localStorage.setItem('chartData', JSON.stringify(stored));

      return updatedData;
    });
    
    setScores({});
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('chartData')) || {};
    if (stored[coin]) {
      setChartData(stored[coin]);
    } else {
      setChartData([]);
    }
  }, [coin]);

  return (
    <div className="app">
      <div className="controls">
        <DateSelector 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} />
        <CoinSelector 
        coin={coin}
        setCoin={setCoin} />
        <IndicatorControls 
          indicators={INDICATORS} 
          scores={scores} 
          onScoreChange={handleScoreChange} />
        <TotalScoreDisplay scores={scores} onSubmit={handleSubmit} />
      </div>
      <div className="score-chart">
        <ScoreChart data={chartData} />
      </div>
    </div>
  );
} 
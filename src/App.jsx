import React, { useState, useEffect } from 'react';
import './App.css';

import IndicatorControls from './components/IndicatorControls';
import TotalScoreDisplay from './components/TotalScoreDisplay';
import DateSelector from './components/DateSelector';
import CoinSelector from './components/CoinSelector';
import ScoreChart from './components/ScoreChart';
import ScoreChartTitle from './components/ScoreChartTitle';

const INDICATORS = ['Aroon', 'DMI', 'MACD', 'Parabolic SAR', 'RSI', 'SMI Ergodic', 'Supertrend'];

export default function App() {
  const [scores, setScores] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [coin, setCoin] = useState('BTC');
  const [chartData, setChartData] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
  });

  const handleScoreChange = (indicator, value) => {
    setScores(prev => ({ ...prev, [indicator]: value }));
  };

  const handleSubmit = () => {
    if (!selectedDate) return;
  
    const values = Object.values(scores);

    const total = values.length ? (values.reduce((acc, val) => acc + val, 0) / values.length).toFixed(2) : 0;

    const parts = selectedDate.split('-');
    const formattedDate = parts.length > 1 ? `${parts[1]}/${parts[2]}/${parts[0]}` : selectedDate;
    const monthKey = `${parts[1]}-${parts[0]}`;
    
    setChartData(() => {
      const stored = JSON.parse(localStorage.getItem('chartData')) || {};
      const coinData = stored[coin] || {};
      const monthData = coinData[monthKey] || [];

      const existingDateIndex = monthData.findIndex(data => data.date === formattedDate);
      const newEntry = { date: formattedDate, score: total, indicators: scores, coin: coin };

      if (existingDateIndex > -1) {
        monthData[existingDateIndex] = newEntry;
      } else {
        monthData.push(newEntry);
      }

      coinData[monthKey] = monthData;
      stored[coin] = coinData;
      localStorage.setItem('chartData', JSON.stringify(stored));

      return monthData;
    });
    
    setScores({});
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('chartData')) || {};
    const coinData = stored[coin] || {};
    setChartData(coinData[currentMonth] || []);
  }, [coin, currentMonth]);

  return (
    <div className="app">
      <div className="controls">
        <DateSelector 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth} />
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
        <ScoreChartTitle coin={coin} currentMonth={currentMonth} />
        <ScoreChart data={chartData} />
      </div>
    </div>
  );
} 
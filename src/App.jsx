// App.jsx
import React, { useState } from 'react';
import IndicatorControls from './components/IndicatorControls';
import TotalScoreDisplay from './components/TotalScoreDisplay';
import ScoreChart from './components/ScoreChart';
import DateCoinSelector from './components/DateCoinSelector';

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
    const total = Object.values(scores).reduce((acc, val) => acc + val, 0);
    setChartData(prev => [...prev, { date: selectedDate, score: total }]);
    setScores({});
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="w-full md:w-1/3 space-y-4">
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
      <div className="w-full md:w-2/3">
        <ScoreChart data={chartData} />
      </div>
    </div>
  );
} 
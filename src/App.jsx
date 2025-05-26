import React, { useState, useEffect } from 'react';
import './App.css';

import IndicatorControls from './components/IndicatorControls';
import TotalScoreDisplay from './components/TotalScoreDisplay';
import DateSelector from './components/DateSelector';
import AssetSelector from './components/AssetSelector';
import ScoreChart from './components/ScoreChart';
import ScoreChartTitle from './components/ScoreChartTitle';

const DEFAULT_INDICATORS = ['Aroon', 'DMI', 'MACD', 'Parabolic SAR', 'RSI', 'SMI Ergodic', 'Supertrend'];

export default function App() {
  const [scores, setScores] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [asset, setAsset] = useState('BTC');
  const [assets, setAssets] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('assets'));
    return saved?.length ? saved : ['BTC', 'ETH', 'SOL', 'XRP'];
  });

  const [chartData, setChartData] = useState([]);

  const [indicators, setIndicators] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('indicators'));
    return saved?.length ? saved : DEFAULT_INDICATORS;
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
  });

  const addIndicator = (name) => {
    const trimmed = name.trim();
    if (trimmed && !indicators.includes(trimmed)) {
      setIndicators(prev => [...prev, trimmed]);
    }
  };

  const removeIndicator = (name) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove this indicator?`);
    if (!confirmDelete) return;

    setIndicators(prev => prev.filter(ind => ind !== name));
    setScores(prev => {
      const newScores = { ...prev };
      delete newScores[name];
      return newScores;
    });
  };

  const addAsset = (name) => {
    const trimmed = name.trim().toUpperCase();
    if (trimmed && !assets.includes(trimmed)) {
      setAssets(prev => [...prev, trimmed]);
    }
  };

  const removeAsset = () => {
    const confirmDelete = window.confirm(`Are you sure you want to remove ${asset}?`);
    if (!confirmDelete) return;

    if (assets.length <= 1) {
      alert("At least one asset must remain.");
      return;
    }

    const filtered = assets.filter(a => a !== asset);
    setAssets(filtered);
    setAsset(filtered[0]);

    const stored = JSON.parse(localStorage.getItem('chartData')) || {};
    delete stored[asset];
    localStorage.setItem('chartData', JSON.stringify(stored));
  };

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

    setCurrentMonth(monthKey);

    setChartData(() => {
      const stored = JSON.parse(localStorage.getItem('chartData')) || {};
      const assetData = stored[asset] || {};
      const monthData = assetData[monthKey] || [];

      const existingDateIndex = monthData.findIndex(data => data.date === formattedDate);
      const newEntry = { date: formattedDate, score: total, indicators: scores, asset };

      if (existingDateIndex > -1) {
        monthData[existingDateIndex] = newEntry;
      } else {
        monthData.push(newEntry);
      }

      assetData[monthKey] = monthData;
      stored[asset] = assetData;
      localStorage.setItem('chartData', JSON.stringify(stored));

      return monthData;
    });

    setScores({});
  };

  const clearChartForCurrentMonth = () => {
    const confirmDelete = window.confirm(`Are you sure you want to clear all chart data for ${asset} - ${currentMonth}?`);
    if (!confirmDelete) return;

    const stored = JSON.parse(localStorage.getItem('chartData')) || {};
    const assetData = stored[asset] || {};

    delete assetData[currentMonth];

    stored[asset] = assetData;
    localStorage.setItem('chartData', JSON.stringify(stored));
    setChartData([]);
  };


  // Sync chartData on asset/month change
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('chartData')) || {};
    const assetData = stored[asset] || {};
    setChartData(assetData[currentMonth] || []);
  }, [asset, currentMonth]);

  // Save indicators to localStorage
  useEffect(() => {
    localStorage.setItem('indicators', JSON.stringify(indicators));
  }, [indicators]);

  // Save assets to localStorage
  useEffect(() => {
    localStorage.setItem('assets', JSON.stringify(assets));
  }, [assets]);

  return (
    <div className="app">
      <div className="controls">
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <AssetSelector
          asset={asset}
          setAsset={setAsset}
          assets={assets}
          addAsset={addAsset}
          removeAsset={removeAsset}
        />
        <IndicatorControls
          indicators={indicators}
          scores={scores}
          onScoreChange={handleScoreChange}
          onAddIndicator={addIndicator}
          onRemoveIndicator={removeIndicator}
        />
        <TotalScoreDisplay scores={scores} onSubmit={handleSubmit} />
      </div>
      <div className="score-chart">
        <button
          className="clear-chart-btn"
          onClick={clearChartForCurrentMonth}
          title={`Clear ${asset} - ${currentMonth}`}
        >X</button>
        <ScoreChartTitle asset={asset} currentMonth={currentMonth} />
        <ScoreChart data={chartData} />
      </div>
    </div>
  );
}

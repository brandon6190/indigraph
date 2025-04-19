// components/DateCoinSelector.jsx
import React from 'react';

export default function DateCoinSelector({ selectedDate, setSelectedDate, coin, setCoin }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="block">Select Date</label>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={e => setSelectedDate(e.target.value)} 
          className="border p-2 w-full" 
        />
      </div>
      <div>
        <label className="block">Select Coin</label>
        <select 
          value={coin} 
          onChange={e => setCoin(e.target.value)} 
          className="border p-2 w-full">
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="SOL">SOL</option>
          <option value="SOL">XRP</option>
        </select>
      </div>
    </div>
  );
}
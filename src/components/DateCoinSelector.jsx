import React from 'react';

export default function DateCoinSelector({ selectedDate, setSelectedDate, coin, setCoin }) {
  return (
    <div className="date-coin-selector">
      <div className="date-selector">
        <label>Select Date</label>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={e => setSelectedDate(e.target.value)}  
        />
      </div>
      <div className="coin-selector">
        <label>Select Coin</label>
        <select 
          value={coin} 
          onChange={e => setCoin(e.target.value)}>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="SOL">SOL</option>
          <option value="XRP">XRP</option>
        </select>
      </div>
    </div>
  );
}
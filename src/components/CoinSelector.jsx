import React from 'react';

export default function CoinSelector({coin, setCoin}) {
    return (
        <div className="coin-selector">
            <label>Select Asset</label>
            <select 
            value={coin} 
            onChange={e => setCoin(e.target.value)}>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
                <option value="XRP">XRP</option>
            </select>
        </div>
    );
}
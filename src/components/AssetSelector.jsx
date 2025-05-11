import React, { useState } from 'react';

export default function AssetSelector({ asset, setAsset, assets, addAsset, removeAsset }) {
  const [newAsset, setNewAsset] = useState('');

  const handleAdd = () => {
    addAsset(newAsset);
    setNewAsset('');
  };

  return (
    <div className="asset-selector">
      <label>Select Asset</label>
      <select value={asset} onChange={e => setAsset(e.target.value)}>
        {assets.map((a, idx) => (
          <option key={idx} value={a}>{a}</option>
        ))}
      </select>

      <div className="asset-add">
        <input
          type="text"
          value={newAsset}
          onChange={e => setNewAsset(e.target.value)}
          placeholder="Add Asset (e.g. ADA)"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <button onClick={removeAsset} className="asset-remove-btn">
        Remove Asset
      </button>
    </div>
  );
}

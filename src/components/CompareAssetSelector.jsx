import React, { useState } from 'react';

export default function CompareAssetSelector({ assets, compareAssets, setCompareAssets, currentAsset }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleCheckboxChange = (asset) => {
    if (compareAssets.includes(asset)) {
      setCompareAssets(compareAssets.filter(a => a !== asset));
    } else {
      setCompareAssets([...compareAssets, asset]);
    }
  };

  const filteredAssets = assets.filter(asset => asset !== currentAsset);

  return (
    <div className="compare-selector">
      <button className="compare-toggle-btn" onClick={toggleDropdown}>
        Compare Assets
      </button>

      {isOpen && (
        <div className="compare-dropdown">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  checked={compareAssets.includes(asset)}
                  onChange={() => handleCheckboxChange(asset)}
                />
                {asset}
              </label>
            ))
          ) : (
            <p className="empty-compare-msg">No assets to compare</p>
          )}
        </div>
      )}
    </div>
  );
}
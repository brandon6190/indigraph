import React from 'react';

export default function DateSelector({selectedDate, setSelectedDate}) {
    return (
        <div className="date-selector">
            <label>Select Date</label>
            <input 
            type="date" 
            value={selectedDate} 
            onChange={e => setSelectedDate(e.target.value)} />
        </div>
    );
}
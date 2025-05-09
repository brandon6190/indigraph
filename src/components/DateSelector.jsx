import React from 'react';

export default function DateSelector({selectedDate, setSelectedDate, currentMonth, setCurrentMonth}) {
    const changeMonth = (offset) => {
        const [month, year] = currentMonth.split('-').map(Number);
        const newDate = new Date(year, month - 1 + offset);
        const newMonthKey = `${String(newDate.getMonth() + 1).padStart(2, '0')}-${newDate.getFullYear()}`;
        setCurrentMonth(newMonthKey);
    };

    return (
        <div className="date-selector">
            <label>Select Date</label>
            <input 
            type="date" 
            value={selectedDate} 
            onChange={e => setSelectedDate(e.target.value)} />
            <div className="month-nav">
                <button className="month-btn" onClick={() => changeMonth(-1)}>Prev</button>
                <button className="month-btn" onClick={() => changeMonth(1)}>Next</button>
            </div>
        </div>
    );
}
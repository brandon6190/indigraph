import React from 'react';

export default function scoreChartTitle({asset, currentMonth}) {
    const months = {
        '01': 'JAN',
        '02': 'FEB',
        '03': 'MAR',
        '04': 'APR',
        '05': 'MAY',
        '06': 'JUNE',
        '07': 'JULY',
        '08': 'AUG',
        '09': 'SEP',
        '10': 'OCT',
        '11': 'NOV',
        '12': 'DEC',
    }

    const [month, year] = currentMonth.split('-');

    return <h2 className="score-chart-title">{asset} - {months[month]} {year}</h2>;
}
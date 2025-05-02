import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function ScoreChart({ data }) {
  let sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  for (let data of sortedData) {
    //changing format from year-month-day to month/day/year
    let parts = data.date.split('-');

    // checking if parts has more strings to avoid adding double 'undefined'
    if (parts.length > 1) data.date = `${parts[1]}/${parts[2]}/${parts[0]}`;
  }

  const chartData = {
    labels: sortedData.map(entry => entry.date),
    datasets: [
      {
        label: 'Total Score',
        data: sortedData.map(entry => entry.score),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,
        tension: 0.2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        max: 1.10,
        min: -1.10,
        beginAtZero: true,
        ticks: {
          callback: function(value, index, ticks) {
            return (index === 0 || index === ticks.length - 1) ? null : value;
          },
          stepSize: 0.10,
        },
        grid: {
            drawBorder: false,
            color: (context) => {
                if (context.tick.value === 0) {
                  return '#000'; // black line for baseline
                }
                return 'rgba(0,0,0,0.1)'; // light gray for other grid lines
              },
              lineWidth: (context) => {
                return context.tick.value === 0 ? 2 : 1; // thicker line for 0
              }
        }
      },
      x: {
        grid: {
            drawBorder: false
        },
        ticks: {
          callback: function(val, index, ticks) {
            return index % 2 === 0 ? this.getLabelForValue(val) : '';
          }
        }
      }
    },
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
    }
  };

  return (
    <div className="chart"> {/* Responsive wrapper for size */}
      <Line data={chartData} options={options} />
    </div>
  );
}

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

  for (data of sortedData) {
    data.date = new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
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
        min: -1,
        max: 1,
        beginAtZero: true,
        ticks: {
          stepSize: 0.1
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
        }
      }
    },
    plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
    }
  };

  return (
    <div className="chart"> {/* Responsive wrapper for size */}
      <Line data={chartData} options={options} />
    </div>
  );
}

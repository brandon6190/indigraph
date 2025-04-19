// components/ScoreChart.jsx
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
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Total Score',
        data: data.map(entry => entry.score),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
        tension: 0.2
      }
    ]
  };

  const options = {
    scales: {
      y: {
        min: -1,
        max: 1,
        ticks: {
          stepSize: 0.1
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}

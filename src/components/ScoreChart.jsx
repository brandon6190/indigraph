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

// Color palette for assets
const assetColors = [
  'rgb(75, 192, 192)', // teal
  'rgb(255, 99, 132)', // red
  'rgb(54, 162, 235)', // blue
  'rgb(255, 206, 86)', // yellow
  'rgb(153, 102, 255)', // purple
  'rgb(255, 159, 64)'  // orange
];

export default function ScoreChart({ data }) {
  // Group entries by asset
  const groupedByAsset = {};

  for (let entry of data) {
    const [month, day, year] = entry.date.split('-'); // convert YYYY-MM-DD to MM/DD/YYYY
    const formattedDate = `${month}/${day}/${year}`;
    if (!groupedByAsset[entry.asset]) groupedByAsset[entry.asset] = [];
    groupedByAsset[entry.asset].push({ ...entry, date: formattedDate });
  }

  // Sort each asset's data by date
  for (let asset in groupedByAsset) {
    groupedByAsset[asset].sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // Generate datasets and labels
  const datasets = Object.keys(groupedByAsset).map((asset, index) => ({
    label: asset,
    data: groupedByAsset[asset].map(entry => entry.score),
    borderColor: assetColors[index % assetColors.length],
    backgroundColor: assetColors[index % assetColors.length],
    pointRadius: 5,
    pointHoverRadius: 7,
    fill: false,
    tension: 0.2
  }));

  // Use the first asset's dates for x-axis labels
  const labels = groupedByAsset[Object.keys(groupedByAsset)[0]]?.map(entry => entry.date.split('/')[1]) || [];

  const chartData = {
    labels,
    datasets
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
          stepSize: 0.10,
          callback: function (value, index, ticks) {
            return (index === 0 || index === ticks.length - 1) ? null : value;
          }
        },
        grid: {
          drawBorder: false,
          color: (ctx) => (ctx.tick.value === 0 ? '#000' : 'rgba(0,0,0,0.1)'),
          lineWidth: (ctx) => (ctx.tick.value === 0 ? 2 : 1)
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
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.formattedValue}`;
          },
          title: function (items) {
            return `Day ${items[0].label}`;
          }
        }
      }
    }
  };

  return (
    <div className="chart">
      <Line data={chartData} options={options} />
    </div>
  );
}

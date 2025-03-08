import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartComponentProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      backgroundColor: string;
      borderColor: string;
      tension: number;
    }[];
  };
  options: {
    responsive: boolean;
    scales: {
      y: {
        display: boolean;
      };
    };
    plugins: {
      legend: {
        display: boolean;
      };
      title: {
        display: boolean;
      };
    };
  };
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default ChartComponent;
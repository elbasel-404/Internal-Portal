"use client";

import type { ChartDataset, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";

interface LineChartProps {
  options?: ChartOptions<"line">;
  labels?: string[];
  datasets: ChartDataset<"line">[];
}

const LINE_OPTIONS = {
  responsive: true,

  scales: {
    y: {
      beginAtZero: true,
      max: 10,
      min: 0,
      ticks: {
        color: "#9A9FA5",
        stepSize: 5,
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
};

export const LineChart = ({ options, labels, datasets }: LineChartProps) => {
  const data = {
    labels,
    datasets,
  };
  return <Line data={data} options={options || LINE_OPTIONS} />;
};

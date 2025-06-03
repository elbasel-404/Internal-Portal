"use client"

import type { ChartDataset, ChartOptions } from "chart.js"
import { Doughnut } from "react-chartjs-2"

interface DoughnutChartProps {
  options?: ChartOptions<"doughnut">
  labels?: string[]
  datasets: ChartDataset<"doughnut">[]
}

const DOUGHNUT_OPTIONS = {
  responsive: true,
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
}

export const DoughnutChart = ({
  options,
  labels,
  datasets,
}: DoughnutChartProps) => {
  const data = {
    labels,
    datasets,
  }
  return <Doughnut data={data} options={options || DOUGHNUT_OPTIONS} />
}

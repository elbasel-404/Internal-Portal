import {
  Chart,
  Filler,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  ArcElement,
} from "chart.js"

export const registerChartjsPlugins = () => {
  Chart.register(
    Filler,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    ArcElement,
  )
}

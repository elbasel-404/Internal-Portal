import { ChartData } from "@types"
import { ChartConfig } from "../../../ui/chart"
import { PieChartElem } from "../../../ui/pie-chart"

interface PieStatProps {
  label: string
  percentage: number
  time: string
  pieData: ChartData[]
  pieConfig: ChartConfig
}

export const PieStat = ({
  label,
  percentage,
  time,
  pieData,
  pieConfig,
}: PieStatProps) => {
  return (
    <div className="flex flex-col items-center">
      <PieChartElem
        size={5}
        thickness={10}
        percentage={percentage}
        percentageSize="text-2xl"
        percentageColor="fill-foreground font-bold"
        nameKey="stat"
        dataKey="percentage"
        chartConfig={pieConfig}
        chartData={pieData}
        label={time}
        labelClassName="fill-stormGray"
        pieChartHeight="150"
      />
      <span className="font-normal text-foreground">{label}</span>
    </div>
  )
}

import { AreaChartInteractive, PieChartElem, RadialChart } from "@ui"

const AreaChartGredTestPage = () => {
  return (
    <div className="grid gap-4 grid-cols-2 h-screen grid-rows-2 dark bg-black">
      <div>{/* <AreaChartGrad /> */}</div>
      <div>
        <AreaChartInteractive />
      </div>
      <div className="flex items-center justify-center">
        <PieChartElem
          size={2}
          thickness={8}
          percentageSize="text-base"
          percentageColor="fill-primary"
          percentage={30}
          nameKey="browser"
          dataKey="visitors"
          label=""
          chartConfig={{
            visitors: {
              label: "Visitors",
            },
            chrome: {
              label: "Chrome",
              color: "hsl(var(--chart-1))",
            },
            safari: {
              label: "Safari",
              color: "white",
            },
          }}
          chartData={[
            { browser: "chrome", visitors: 30, fill: "var(--color-chrome)" },
            { browser: "safari", visitors: 70, fill: "var(--color-safari)" },
          ]}
        />
      </div>
      <div className="flex items-center justify-center">
        <RadialChart />
      </div>
    </div>
  )
}
export default AreaChartGredTestPage

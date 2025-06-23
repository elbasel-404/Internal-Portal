import { colors } from "@lib"
import { GoalRequest } from "@types"
import { Button, PieChartElem } from "@ui"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { useState } from "react"
import { StrategicGoals } from "./StrategicGoals"

const tableHeaders = [
  { label: "الهدف الفردي" },
  { label: "وزن الهدف" },
  { label: "مستوى حالة التقدم" },
  { label: "الملاحظات" },
]

interface GoalFlowTableProps {
  goalsData: GoalRequest[]
}

export const GoalFlowTable = ({ goalsData }: GoalFlowTableProps) => {
  const [isStrtegicGoals, setIsStrategicGoals] = useState(false)

  const pieChartConfig = {
    completed: {
      color: colors.light.primary,
    },
    notCompleted: {
      color: colors.light.white,
    },
  }
  return (
    <div className="overflow-x-auto app-scrollbar">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-cloudGray">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="text-center text-black font-medium text-base p-4 border border-gray-200"
                colSpan={header.label === "وزن المؤشر" ? 2 : 1}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {goalsData.map((goal) => {
            const totalGoalWeight = Number(goal.goalWeight)

            const goalWeightChartData = [
              {
                stat: "",
                percentage: totalGoalWeight,
                fill: "var(--color-completed)",
              },
              {
                stat: "",
                percentage: 100 - totalGoalWeight,
                fill: "var(--color-notCompleted)",
              },
            ]

            return goal.indicators.map((indicator, indicatorIndex) => (
              <tr key={`${goal.id}-${indicatorIndex}`} className="bg-white">
                {indicatorIndex === 0 && (
                  <td
                    rowSpan={goal.indicators.length}
                    className="p-4 border border-gray-200 align-middle bg-grey-100"
                  >
                    <p>{goal.individualGoal}</p>
                    <div className="flex items-center">
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          setIsStrategicGoals(!isStrtegicGoals)
                        }}
                        className="bg-transparent shadow-none hover:bg-transparent text-sm underline text-primary p-0"
                      >
                        التفاصيل
                      </Button>
                      {isStrtegicGoals ? (
                        <ChevronUpIcon size={18} className="text-primary" />
                      ) : (
                        <ChevronDownIcon size={18} className="text-primary" />
                      )}
                    </div>
                  </td>
                )}
                {indicatorIndex === 0 && (
                  <td
                    rowSpan={goal.indicators.length}
                    className="border border-gray-200 align-middle bg-primary-opacity"
                  >
                    <div className="flex items-center justify-center">
                      <PieChartElem
                        size={4}
                        thickness={10}
                        percentage={totalGoalWeight}
                        percentageSize="text-base"
                        percentageColor="fill-foreground"
                        nameKey="stat"
                        dataKey="percentage"
                        chartConfig={pieChartConfig}
                        chartData={goalWeightChartData}
                        pieChartHeight="64"
                      />
                    </div>
                  </td>
                )}
                {indicatorIndex === 0 && (
                  <td className="p-4 border border-gray-200 align-middle text-center">
                    {"متأخر"}
                  </td>
                )}
                {indicatorIndex === 0 && (
                  <td className="p-4 border border-gray-200 align-middle text-center">
                    {"ملاحظات من قبل المستخدم"}
                  </td>
                )}
              </tr>
            ))
          })}
        </tbody>
      </table>
      {isStrtegicGoals && <StrategicGoals goalsData={goalsData} />}
    </div>
  )
}

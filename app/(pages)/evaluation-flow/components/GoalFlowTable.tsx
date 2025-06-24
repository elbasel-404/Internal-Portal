import { colors } from "@lib"
import { GoalFlowRequest } from "@types"
import { Button, PieChartElem } from "@ui"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import React, { useState } from "react"
import { GoalsTable } from "../../../components/GoalsTable"
import { StrategicGoals } from "../../../components/StrategicGoals"

interface GoalFlowTableProps {
  goalsData: GoalFlowRequest[]
  evaluationFlowType?: string
}

export const GoalFlowTable = ({
  goalsData,
  evaluationFlowType,
}: GoalFlowTableProps) => {
  // Track expanded state for each goal by ID
  const [expandedGoals, setExpandedGoals] = useState<Record<string, boolean>>(
    {},
  )

  const toggleStrategicGoals = (goalId: string) => {
    setExpandedGoals((prev) => ({
      ...prev,
      [goalId]: !prev[goalId],
    }))
  }

  const pieChartConfig = {
    completed: {
      color: colors.light.primary,
    },
    notCompleted: {
      color: colors.light.white,
    },
  }

  // Determine table headers based on evaluation flow type
  const isOfficialFollowUp = evaluationFlowType === "المتابعة الشخصية"

  const baseHeaders = [
    { label: "الهدف الفردي" },
    { label: "وزن الهدف" },
    { label: "مستوى حالة التقدم" },
  ]

  const additionalHeaders = [
    { label: "الانشطة" },
    { label: "تاريخ النشاط" },
    { label: "حالة النشاط" },
  ]

  const notesHeader = [{ label: "الملاحظات" }]

  const tableHeaders = isOfficialFollowUp
    ? [...baseHeaders, ...additionalHeaders, ...notesHeader]
    : [...baseHeaders, ...notesHeader]

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
            const isExpanded = expandedGoals[goal.id] || false

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

            return (
              <React.Fragment key={goal.id}>
                <tr className="bg-white">
                  <td className="p-4 border border-gray-200 align-middle bg-grey-100">
                    <p>{goal.individualGoal}</p>
                    <div className="flex items-center">
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          toggleStrategicGoals(goal.id)
                        }}
                        className="bg-transparent shadow-none hover:bg-transparent text-sm underline text-primary p-0 transition-colors duration-200"
                      >
                        التفاصيل
                      </Button>
                      <div className="transition-transform duration-200 ease-in-out">
                        {isExpanded ? (
                          <ChevronUpIcon size={18} className="text-primary" />
                        ) : (
                          <ChevronDownIcon size={18} className="text-primary" />
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="border border-gray-200 align-middle bg-primary-opacity">
                    <div className="flex items-center justify-center">
                      <PieChartElem
                        size={3}
                        thickness={8}
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

                  <td className="p-4 border border-gray-200 align-middle text-center">
                    {goal.progressStatus}
                  </td>

                  {/* Additional columns for official follow-up */}
                  {isOfficialFollowUp && (
                    <>
                      <td className="p-4 border border-gray-200 align-middle text-center">
                        {goal.activities || "لا توجد أنشطة"}
                      </td>
                      <td className="p-4 border border-gray-200 align-middle text-center">
                        {goal.activityDate || "غير محدد"}
                      </td>
                      <td className="p-4 border border-gray-200 align-middle text-center">
                        {goal.activityStatus || "غير محدد"}
                      </td>
                    </>
                  )}

                  <td className="p-4 border border-gray-200 align-middle text-center">
                    {goal.notes || "لا توجد ملاحظات"}
                  </td>
                </tr>

                {/* Show strategic goals for this specific goal if expanded */}
                <tr>
                  <td
                    colSpan={isOfficialFollowUp ? 7 : 4}
                    className="p-0 border-none"
                  >
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="transform transition-transform duration-300 ease-in-out">
                        <GoalsTable
                          goalsData={[goal]}
                          hideIndividualGoal={true}
                          hideActions={true}
                        />
                        <StrategicGoals goalsData={[goal]} />
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

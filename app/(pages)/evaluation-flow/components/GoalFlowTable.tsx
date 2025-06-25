import { GoalsTable } from "@components"
import {
  DateField,
  InputField,
  SelectField,
  TextareaField,
} from "@components/form"
import { colors } from "@lib"
import { GoalFlowRequest } from "@types"
import { Button, PieChartElem } from "@ui"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import React, { ChangeEvent, useEffect, useState } from "react"
import { StrategicGoals } from "../../../components/StrategicGoals"

interface GoalFlowTableProps {
  goalsData: GoalFlowRequest[]
  evaluationFlowType?: string
  editable?: boolean
  onGoalUpdate?: (
    goalId: string,
    field: keyof GoalFlowRequest,
    value: string,
  ) => void
}

const activityStatusOptions = [
  { id: "غير محدد", name: "غير محدد" },
  { id: "مكتمل", name: "مكتمل" },
  { id: "قيد التنفيذ", name: "قيد التنفيذ" },
  { id: "متأخر", name: "متأخر" },
  { id: "لم يبدأ", name: "لم يبدأ" },
]

const progressStatusOptions = [
  { id: "على المسار", name: "على المسار" },
  { id: "مؤجل", name: "مؤجل" },
  { id: "متأخر", name: "متأخر" },
]

export const GoalFlowTable = ({
  goalsData,
  evaluationFlowType,
  editable = false,
  onGoalUpdate,
}: GoalFlowTableProps) => {
  // Track expanded state for each goal by ID
  const [expandedGoals, setExpandedGoals] = useState<Record<string, boolean>>(
    {},
  )

  // Local state to manage editable data
  const [localGoalsData, setLocalGoalsData] = useState<GoalFlowRequest[]>(
    () => {
      if (editable) {
        // Initialize with empty values for editable fields when editable is true
        return goalsData.map((goal) => ({
          ...goal,
          progressStatus: "",
          activities: "",
          activityDate: "",
          activityStatus: "",
          notes: "",
        }))
      }
      return goalsData
    },
  )

  // Update local state when props change
  useEffect(() => {
    if (editable) {
      // Initialize with empty values for editable fields when editable is true
      setLocalGoalsData(
        goalsData.map((goal) => ({
          ...goal,
          progressStatus: "",
          activities: "",
          activityDate: "",
          activityStatus: "",
          notes: "",
        })),
      )
    } else {
      setLocalGoalsData(goalsData)
    }
  }, [goalsData, editable])

  const toggleStrategicGoals = (goalId: string) => {
    setExpandedGoals((prev) => ({
      ...prev,
      [goalId]: !prev[goalId],
    }))
  }

  const handleFieldChange = (
    goalId: string,
    field: keyof GoalFlowRequest,
    value: string,
  ) => {
    // Update local state immediately for responsive UI
    setLocalGoalsData((prev) =>
      prev.map((goal) =>
        goal.id === goalId ? { ...goal, [field]: value } : goal,
      ),
    )

    // Call parent callback if provided
    if (onGoalUpdate) {
      onGoalUpdate(goalId, field, value)
    }
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
  const isPersonalFollowUp =
    evaluationFlowType === "personalFollowUp" ||
    evaluationFlowType === "المتابعة الشخصية"

  const baseHeaders = [{ label: "الهدف الفردي" }, { label: "وزن الهدف" }]

  // Only add progress status header when NOT in personal follow-up mode
  const progressStatusHeader = !isPersonalFollowUp
    ? [{ label: "مستوى حالة التقدم" }]
    : []

  const additionalHeaders = [
    { label: "الانشطة" },
    { label: "تاريخ النشاط" },
    { label: "حالة النشاط" },
  ]

  const notesHeader = [{ label: "الملاحظات" }]

  const tableHeaders = isPersonalFollowUp
    ? [...baseHeaders, ...additionalHeaders, ...notesHeader]
    : [...baseHeaders, ...progressStatusHeader, ...notesHeader]

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
          {localGoalsData.map((goal) => {
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

                  {/* Only show progress status column when NOT in personal follow-up mode */}
                  {!isPersonalFollowUp && (
                    <td className="p-4 border border-gray-200 align-middle text-center">
                      {editable ? (
                        <SelectField
                          label=""
                          name="progressStatus"
                          value={goal.progressStatus}
                          onChange={(value: string) =>
                            handleFieldChange(goal.id, "progressStatus", value)
                          }
                          types={progressStatusOptions}
                          placeholder="--"
                        />
                      ) : (
                        goal.progressStatus
                      )}
                    </td>
                  )}

                  {/* Additional columns for personal follow-up */}
                  {isPersonalFollowUp && (
                    <>
                      <td className="p-4 border border-gray-200 align-middle text-center">
                        {editable ? (
                          <InputField
                            label=""
                            name="activities"
                            value={goal.activities}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleFieldChange(
                                goal.id,
                                "activities",
                                e.target.value,
                              )
                            }
                          />
                        ) : (
                          goal.activities
                        )}
                      </td>
                      <td className="p-4 border border-gray-200 align-middle text-center">
                        {editable ? (
                          <DateField
                            label=""
                            name="activityDate"
                            date={
                              goal.activityDate
                                ? new Date(goal.activityDate)
                                : undefined
                            }
                            onChange={(date: Date | null | undefined) =>
                              handleFieldChange(
                                goal.id,
                                "activityDate",
                                date ? date.toISOString() : "",
                              )
                            }
                            required={false}
                          />
                        ) : (
                          goal.activityDate
                        )}
                      </td>
                      <td className="p-4 border border-gray-200 align-middle text-center">
                        {editable ? (
                          <SelectField
                            label=""
                            name="activityStatus"
                            value={goal.activityStatus}
                            onChange={(value: string) =>
                              handleFieldChange(
                                goal.id,
                                "activityStatus",
                                value,
                              )
                            }
                            types={activityStatusOptions}
                            placeholder="--"
                          />
                        ) : (
                          goal.activityStatus
                        )}
                      </td>
                    </>
                  )}

                  <td className="p-4 border border-gray-200 align-middle text-center">
                    {editable ? (
                      <TextareaField
                        label=""
                        name="notes"
                        value={goal.notes || ""}
                        onChange={(e) =>
                          handleFieldChange(goal.id, "notes", e.target.value)
                        }
                        placeholder=""
                        required={false}
                      />
                    ) : (
                      goal.notes
                    )}
                  </td>
                </tr>

                {/* Show strategic goals for this specific goal if expanded */}
                <tr>
                  <td
                    colSpan={isPersonalFollowUp ? 6 : 4}
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

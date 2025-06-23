"use client"

import { RequestDetails } from "@components"
import { GoalRequest } from "@types"
import { GoalFlowTable } from "./GoalFlowTable"

interface GoalDetailsProps {
  goalsData: GoalRequest[]
}

export const GoalLists = ({ goalsData }: GoalDetailsProps) => {
  const totalGoalWeight = goalsData.reduce(
    (sum, goal) => sum + Number(goal.goalWeight || 0),
    0,
  )
  return (
    <RequestDetails
      requestDetailsLabel="قائمة الأهداف"
      evaluationCriteria={
        <>
          <GoalFlowTable goalsData={goalsData} />
          <div className="border-t border-[#ECF0F480]"></div>
          <div className="p-4">
            <div className="flex items-center gap-4">
              <p className="text-foreground font-medium">{totalGoalWeight}%</p>
              <div className="w-full rounded-full bg-cloudGray h-3">
                <div
                  className="bg-primary rounded-full h-3 transition-all duration-300"
                  style={{ width: `${totalGoalWeight}%` }}
                />
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}

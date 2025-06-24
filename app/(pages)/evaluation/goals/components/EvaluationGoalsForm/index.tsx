"use client"

import { SelectField } from "@components/form"
import { ModalLink } from "@components/modals/ModalLink"
import { CirclePlusIcon, FloppyDiskIcon, PaperPlaneIcon } from "@icons"
import { paths } from "@lib"
import { Competencies, GoalRequest } from "@types"
import { Button } from "@ui"
import { RotateCcw } from "lucide-react"
import Link from "next/link"
import { GoalsTable } from "../../../../../components/GoalsTable"
import { CompetenciesSection } from "../CompetenciesSection"

const YearsList = Array.from({ length: 51 }, (_, i) => {
  const currentYear = new Date().getFullYear()
  const year = currentYear + i
  return { id: year, name: year.toString() }
})

interface EvaluationGoalsFormProps {
  goalsData: GoalRequest[]
  leadershipData: Competencies[]
  basicData: Competencies[]
  artisticData: Competencies[]
}

export const EvaluationGoalsForm = ({
  goalsData,
  leadershipData,
  basicData,
  artisticData,
}: EvaluationGoalsFormProps) => {
  const totalGoalWeight = goalsData.reduce(
    (sum, goal) => sum + Number(goal.goalWeight || 0),
    0,
  )
  return (
    <form className="space-y-4">
      <div className="bg-white rounded-md">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">الأهداف</h2>
          <ModalLink
            name="GoalsModal"
            className="flex group font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
          >
            <CirclePlusIcon className="fill-white group-hover:fill-primary" />
            إضافة هدف جديد
          </ModalLink>
        </div>
        <div className="p-4">
          <SelectField
            label="السنة"
            name="year"
            placeholder="--"
            types={YearsList}
            required
          />
        </div>

        <GoalsTable goalsData={goalsData} />

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
      </div>
      <div>
        <CompetenciesSection
          title="الجدارات السلوكية"
          subsections={[
            {
              title: "الجدارات القيادية",
              data: leadershipData,
            },
            {
              title: "الجدارات الاساسية",
              data: basicData,
            },
          ]}
          defaultExpanded={true}
        />
        <CompetenciesSection
          title="الجدارات الفنية"
          data={artisticData}
          defaultExpanded={true}
        />
      </div>
      <div className="flex justify-end mb-2 gap-2 px-4">
        <Button className="flex items-center gap-1 bg-success group text-success-foreground shadow-none hover:bg-success-foreground hover:text-white rounded-xl p-4">
          <FloppyDiskIcon className="fill-success-foreground group-hover:fill-white" />
          حفظ
        </Button>
        <Button
          className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
          type="submit"
        >
          <PaperPlaneIcon className="fill-primary group-hover:fill-white" />
          إرسال
        </Button>

        <Link href={paths.evaluationGoals.href}>
          <Button
            type="button"
            className="flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4"
          >
            <RotateCcw />
            تراجع
          </Button>
        </Link>
      </div>
    </form>
  )
}

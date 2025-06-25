"use client"

import { InputField, RadioField, SelectField } from "@components/form"
import { FloppyDiskIcon, PaperPlaneIcon } from "@icons"
import { paths } from "@lib"
import { Competencies, GoalFlowRequest } from "@types"
import { Button } from "@ui"
import { RotateCcw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { CompetenciesSection } from "../CompetenciesSection"
import { GoalLists } from "../GoalLists"

interface EvaluationGoalsFlowFormProps {
  goalsData: GoalFlowRequest[]
  leadershipData: Competencies[]
  basicData: Competencies[]
  artisticData: Competencies[]
}

export const EvaluationGoalsFlowForm = ({
  goalsData,
  leadershipData,
  basicData,
  artisticData,
}: EvaluationGoalsFlowFormProps) => {
  const [followUpType, setFollowUpType] = useState<string>("officialFolllowUp")
  const totalGoalWeight = goalsData.reduce(
    (sum, goal) => sum + Number(goal.goalWeight || 0),
    0,
  )
  return (
    <form className="space-y-4">
      <div className="bg-white rounded-md p-4 space-y-4">
        <RadioField
          label="نوع المتابعة"
          name="followUpType"
          options={[
            { value: "officialFolllowUp", label: "متابعة رسمية" },
            { value: "periodic[ollowUp", label: "متابعة دورية" },
            { value: "personalFollowUp", label: "متابعة شخصية" },
          ]}
          required={true}
          selectedValue={followUpType}
          onChange={(value) => setFollowUpType(value)}
          labelStyle="text-base"
          inline={false}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="الموظف"
            name="employee"
            placeholder="--"
            types={[]}
            required
          />
          <InputField
            label="السنة"
            name="year"
            placeholder=""
            required
            disabled
          />
        </div>

        <InputField
          label="رقم طلب تخطيط الأداء"
          name="evaluationPlaninigRequest"
          placeholder=""
          required
          disabled
        />

        <GoalLists
          goalsData={goalsData}
          evalutaionFlowType={followUpType}
          editable={true}
        />

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

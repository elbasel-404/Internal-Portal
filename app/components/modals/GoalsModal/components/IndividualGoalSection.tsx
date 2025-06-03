import { SelectField } from "@components/form"
import { AddNewGoalButton } from "./AddNewGoalButton"

interface IndividualGoalSectionProps {
  individualGoal: string
  onInputChange: (name: string, value: string) => void
}

export const IndividualGoalSection = ({
  individualGoal,
  onInputChange,
}: IndividualGoalSectionProps) => {
  return (
    <>
      <AddNewGoalButton modalName="IndividualGoalModal">
        إضافة هدف فردي جديد
      </AddNewGoalButton>

      <SelectField
        label="الهدف الفردي"
        name="individualGoal"
        placeholder=""
        value={individualGoal}
        onChange={(value) => onInputChange("individualGoal", value)}
        required
        types={[
          { id: "1", name: "الهدف الفردي الأول" },
          { id: "2", name: "الهدف الفردي الثاني" },
        ]}
      />
    </>
  )
}

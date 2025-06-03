import { CheckboxListField, SelectField } from "@components/form"
import { TrainingTypeSectionProps } from "../FormTypes/types"
import { TrainingTypes } from "../config"

export const TrainingTypeSection = ({
  trainingType,
  setTrainingType,
  trainingNature,
  setTrainingNature,
}: TrainingTypeSectionProps) => (
  <div className="space-y-6">
    <SelectField
      label="نوع التدريب"
      name="trainingType"
      placeholder="___"
      types={TrainingTypes}
      value={trainingType}
      onChange={(value) => setTrainingType(value)}
    />

    {trainingType === "2" && (
      <CheckboxListField
        label="طبيعة التدريب"
        name="trainingNature"
        required
        options={[
          { value: "test", label: "اختبار" },
          { value: "training", label: "تدريب" },
          { value: "membership", label: "عضوية" },
          { value: "studyMaterilas", label: "مواد دراسية" },
        ]}
        selectedValues={trainingNature}
        onChange={(values) => setTrainingNature(values)}
        className="space-y-2"
        layoutClass="md:gap-36"
        labelStyle="font-medium text-foreground"
      />
    )}
  </div>
)

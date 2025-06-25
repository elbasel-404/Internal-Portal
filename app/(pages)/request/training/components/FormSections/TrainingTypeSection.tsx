import { CheckboxListField, SelectField } from "@components/form"
import { TrainingTypeSectionProps } from "../FormTypes/types"

export const TrainingTypeSection = ({
  trainingType,
  setTrainingType,
  trainingNature,
  setTrainingNature,
  trainingTypeFields,
}: TrainingTypeSectionProps) => (
  <div className="space-y-6">
    <SelectField
      label="نوع التدريب"
      name="training_type"
      placeholder="___"
      types={trainingTypeFields.map(({ id, training_type }) => ({
        id: id ?? "",
        name: training_type ?? "",
      }))}
      value={trainingType}
      required
      onChange={(value) => setTrainingType(value)}
    />

    {trainingType === "2" && (
      <>
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
        <input
          type="text"
          name="is_test"
          hidden
          aria-hidden
          readOnly
          value={trainingNature.includes("test") ? "true" : "false"}
          className="hidden"
        />
        <input
          type="text"
          name="is_membership"
          hidden
          aria-hidden
          readOnly
          value={trainingNature.includes("membership") ? "true" : "false"}
          className="hidden"
        />
        <input
          type="text"
          name="is_training"
          hidden
          aria-hidden
          readOnly
          value={trainingNature.includes("training") ? "true" : "false"}
          className="hidden"
        />
        <input
          type="text"
          name="is_studying_subjects"
          hidden
          aria-hidden
          readOnly
          value={trainingNature.includes("studyMaterilas") ? "true" : "false"}
          className="hidden"
        />
      </>
    )}
  </div>
)

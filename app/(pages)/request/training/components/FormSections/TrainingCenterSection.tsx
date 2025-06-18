import { CheckboxField, InputField, SelectField } from "@components/form"
import { TrainingCenterSectionProps } from "../FormTypes/types"

export const TrainingCenterSection = ({
  isOtherTrainingCenter,
  setIsOtherTrainingCenter,
  trainingCenter,
  setTrainingCenter,
  trainingCenterName,
  handleTrainingCenterNameChangeValue,
  trainingCentersField,
}: TrainingCenterSectionProps) => (
  <div className="space-y-6">
    {!isOtherTrainingCenter && (
      <SelectField
        label="مراكز التدريب"
        name="training_center_id"
        placeholder="___"
        types={trainingCentersField.map(({ id, name }) => ({
          id: id,
          name: name,
        }))}
        value={trainingCenter}
        onChange={(value) => setTrainingCenter(value)}
      />
    )}

    <CheckboxField
      label="مركز تدريب اخر"
      name="is_other_centers"
      required={false}
      checked={isOtherTrainingCenter}
      onChange={(value) => setIsOtherTrainingCenter(value)}
      className="flex md:items-center gap-x-3"
      labelStyle="text-foreground font-medium leading-0"
      checkboxStyle="-order-1 mt-1 md:mt-0"
    />

    {isOtherTrainingCenter && (
      <InputField
        label="اسم مركز التدريب"
        name="training_center_name"
        placeholder="..."
        value={trainingCenterName}
        onChange={handleTrainingCenterNameChangeValue}
        required
      />
    )}
  </div>
)

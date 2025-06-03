import { InputField, RadioField } from "@components/form"
import { XMarkIcon2 } from "@icons"
import { Button } from "@ui"
import { useState } from "react"
import { TrainingDetailsSectionProps } from "../FormTypes/types"

const trainingMessages: Record<string, string> = {
  internal: "في نفس مدينة الإقامة",
  local: "في المملكة لغير مدينة الإقامة",
  international: "خارج المملكة",
}

export const TrainingDetailsSection = ({
  trainingName,
  handleTrainingNameChangeValue,
  trainingMethod,
  setTrainingMethod,
}: TrainingDetailsSectionProps) => {
  const [isMessageVisible, setIsMessageVisible] = useState(true)

  const handleTrainingMethodChange = (value: string) => {
    setTrainingMethod(value)
    setIsMessageVisible(true)
  }

  const message = trainingMessages[trainingMethod]

  return (
    <div className="space-y-6">
      <InputField
        label="مسمى التدريب"
        name="trainingName"
        placeholder="..."
        value={trainingName}
        onChange={handleTrainingNameChangeValue}
        required
      />

      <RadioField
        label="آلية الانعقاد"
        name="trainingMethod"
        options={[
          { value: "internal", label: "داخلي" },
          { value: "local", label: "محلي" },
          { value: "international", label: "دولي" },
          { value: "remote", label: "عن بعد" },
        ]}
        required
        labelStyle="font-medium text-foreground"
        radioStyle="flex-col md:flex-row gap-4"
        className="flex-col gap-2"
        selectedValue={trainingMethod}
        onChange={handleTrainingMethodChange}
      />

      {isMessageVisible && message && (
        <div className="w-full flex justify-between items-center p-4 bg-primary-opacity rounded-md">
          <p className="text-primary font-medium">{message}</p>
          <Button
            onClick={() => setIsMessageVisible(false)}
            className="bg-transparent shadow-none p-0"
            aria-label="إغلاق التنبيه"
          >
            <XMarkIcon2 className="fill-primary hover:cursor-pointer" />
          </Button>
        </div>
      )}
    </div>
  )
}

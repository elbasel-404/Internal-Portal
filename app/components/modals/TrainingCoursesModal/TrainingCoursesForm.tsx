"use client"

import { TrainingField } from "@api/schemas/index"
import { durationAtom, trainingMethodAtom } from "@atoms"
import { DateField, InputField, SelectField } from "@components/form"
import { CheckIcon, XMarkIcon } from "@icons"
import { Button } from "@ui"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { trainingCoursesFormAction } from "./TrainingCoursesFormAction"

interface TrainingCoursesFormProps {
  trainingTravelDaysSettingsFields?: TrainingField[]
}

export const TrainingCoursesForm = ({
  trainingTravelDaysSettingsFields,
}: TrainingCoursesFormProps) => {
  const router = useRouter()
  const [dateFrom, setDateFrom] = useState<Date>(new Date())
  const [dateTo, setDateTo] = useState<Date>(new Date())
  const [travelDays, setTravelDays] = useState<string>("1")
  const [travelDateSettings, setTravelDateSettings] = useState<string>("")
  const [duration] = useAtom(durationAtom)
  const [trainingMethod] = useAtom(trainingMethodAtom)

  const closeModal = () => {
    router.back()
  }

  const handleSubmit = () => {
    closeModal()
  }

  return (
    <form
      action={trainingCoursesFormAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 mt-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DateField
          required
          label="تاريخ من"
          name="dateFrom"
          date={dateFrom}
          onChange={(date) => setDateFrom(date || new Date())}
        />
        <DateField
          required
          label="تاريخ إلى"
          name="dateTo"
          date={dateTo}
          onChange={(date) => setDateTo(date || new Date())}
        />
        <InputField
          label="المدة باليوم"
          name="duration"
          disabled
          value={duration}
          placeholder=""
        />
        {(trainingMethod === "local" || trainingMethod === "international") && (
          <InputField
            label="أيام السفر"
            name="travel_days"
            disabled
            value={travelDays}
            onChange={(e) => setTravelDays(e.target.value)}
            placeholder=""
            required
          />
        )}
      </div>
      {trainingMethod === "local" && (
        <SelectField
          label="إعدادات تواريخ السفر"
          name="travelDateSettings"
          placeholder=""
          types={(trainingTravelDaysSettingsFields ?? []).map(
            ({ id, name }) => ({
              id: id ?? "",
              name: name ?? "",
            }),
          )}
          value={travelDateSettings}
          onChange={(value) => setTravelDateSettings(value)}
        />
      )}

      <div className="flex justify-end mb-2 gap-2">
        <Button
          onClick={closeModal}
          type="button"
          className="flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4"
        >
          <XMarkIcon className="fill-stormGray w-0 h-0" />
          إغلاق
        </Button>

        <Button
          className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
          type="submit"
        >
          <CheckIcon className="fill-primary group-hover:fill-white" />
          حفظ
        </Button>
      </div>
    </form>
  )
}

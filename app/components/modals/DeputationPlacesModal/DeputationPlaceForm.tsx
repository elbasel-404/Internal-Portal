"use client"

// Removed unused imports
import { InputField, SelectField } from "@components/form"
import { CheckIcon, XMarkIcon } from "@icons"
import { Button } from "@ui"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { deputationPlaceFormAction } from "./DeputationPlaceFormAction"

export const DeputationPlaceForm = () => {
  const router = useRouter()
  const [place, setPlace] = useState("")
  const [city, setCity] = useState("")
  const closeModal = () => {
    router.back()
  }

  const handleSubmit = () => {
    closeModal()
  }

  return (
    <form
      action={deputationPlaceFormAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 mt-4"
    >
      <SelectField
        name="country_id"
        label="البلاد"
        placeholder="__"
        types={[
          { id: "2", name: "مصر" }, // Egypt
          { id: "3", name: "المغرب" }, // Morocco
          { id: "4", name: "تونس" }, // Tunisia
          { id: "5", name: "الجزائر" }, // Algeria
          { id: "6", name: "العراق" }, // Iraq
          { id: "7", name: "سوريا" }, // Syria
          { id: "8", name: "السودان" }, // Sudan
          { id: "9", name: "عُمان" }, // Oman
          { id: "10", name: "قطر" },
        ]}
        value={place}
        onChange={(value) => {
          setPlace(value)
        }}
      />
      <InputField
        name="city_name"
        label="المدينة"
        placeholder=""
        value={city}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
      />
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
          إضافة
        </Button>
      </div>
    </form>
  )
}

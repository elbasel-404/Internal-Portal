"use client"

import {
  CheckboxField,
  DateField,
  InputField,
  SelectField,
} from "@components/form"
import { Indicator } from "@types"
import { TableCell, TableRow } from "@ui"
import { ChangeEvent, useState } from "react"

interface IndicatorRowProps {
  indicator: Indicator
  onIndicatorChange: (updatedIndicator: Indicator) => void
}

export const IndicatorRow = ({
  indicator,
  onIndicatorChange,
}: IndicatorRowProps) => {
  const [showDetails, setShowDetails] = useState(indicator.isChecked)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let newValue: string | number = value

    if (name === "targetValue" && indicator.targetType === "number") {
      newValue = parseInt(value, 10) || 0
    } else if (name === "indicatorWeight") {
      newValue = parseInt(value, 10) || 0
    }

    onIndicatorChange({ ...indicator, [name]: newValue })
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const newTargetValue =
      name === "targetType" &&
      value === "number" &&
      typeof indicator.targetValue === "string"
        ? 0
        : name === "targetType" &&
            value === "date" &&
            typeof indicator.targetValue !== "string"
          ? ""
          : indicator.targetValue

    onIndicatorChange({
      ...indicator,
      [name]: value,
      targetValue: newTargetValue,
    })
  }

  return (
    <TableRow>
      <TableCell className="flex items-center gap-2 mx-4 mt-2">
        <CheckboxField
          name=""
          checked={indicator.isChecked}
          onChange={(checked: boolean) => {
            setShowDetails(checked)
            onIndicatorChange({ ...indicator, isChecked: checked })
          }}
        />
        <span className="ml-2 mb-2">{indicator.name}</span>
      </TableCell>

      <TableCell className="p-2 text-center">
        <div
          className={`transition-opacity duration-300 ${showDetails ? "" : "invisible opacity-0"}`}
        >
          <InputField
            label=""
            name="indicatorWeight"
            value={indicator.indicatorWeight || ""}
            onChange={handleInputChange}
            disabled={!showDetails}
            className="w-24 py-2 rounded"
          />
        </div>
      </TableCell>

      <TableCell className="p-2 text-center">
        <div
          className={`transition-opacity duration-300 ${showDetails ? "" : "invisible opacity-0"}`}
        >
          <InputField
            label=""
            name="achievementSteps"
            value={indicator.achievementSteps}
            onChange={handleInputChange}
            disabled={!showDetails}
            className="w-24 py-2 rounded"
          />
        </div>
      </TableCell>

      <TableCell className="p-2 text-center">
        <div
          className={`transition-opacity duration-300 ${showDetails ? "" : "invisible opacity-0"}`}
        >
          <InputField
            label=""
            name="indicatorScale"
            value={indicator.indicatorScale}
            onChange={handleInputChange}
            disabled={!showDetails}
            className="w-24 py-2 rounded"
          />
        </div>
      </TableCell>

      <TableCell className="p-2 text-center">
        <div
          className={`transition-opacity duration-300 ${showDetails ? "" : "invisible opacity-0"}`}
        >
          <SelectField
            label=""
            name="targetType"
            value={indicator.targetType}
            onChange={(value: string) =>
              handleSelectChange({
                target: { name: "targetType", value },
              } as ChangeEvent<HTMLSelectElement>)
            }
            types={[
              { id: "number", name: "عدد" },
              { id: "date", name: "تاريخ" },
            ]}
            className="rounded py-[18px]"
          />
        </div>
      </TableCell>

      <TableCell className="p-2 text-center">
        <div
          className={`transition-opacity duration-300 ${showDetails ? "" : "invisible opacity-0"}`}
        >
          {indicator.targetType === "date" ? (
            <DateField
              label=""
              name="targetValue"
              date={
                typeof indicator.targetValue === "string" &&
                indicator.targetValue
                  ? new Date(indicator.targetValue)
                  : undefined
              }
              onChange={(date) => {
                onIndicatorChange({
                  ...indicator,
                  targetValue: date ? date.toISOString().split("T")[0] : "",
                })
              }}
              required={false}
              dateInputClassName="rounded py-[18px]"
            />
          ) : (
            <InputField
              label=""
              name="targetValue"
              value={
                indicator.targetType === "number"
                  ? (indicator.targetValue as number) || ""
                  : ""
              }
              onChange={handleInputChange}
              disabled={!showDetails}
              className="py-2 rounded"
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}

"use client"

import { SupplierEvaluationCriterionResult } from "@types"
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@ui"
import { InputField } from "@components/form"

interface SupplierEvaluationCriterionResultProps {
  data: SupplierEvaluationCriterionResult[]
  isForm?: boolean
}

const tableHeaders = [
  { label: "معدل التقييم" },
  { label: "الوزن %" },
  { label: "تقييم المورد" },
  { label: "مجموعة نقاط الموردين %" },
]

export const EvaluationResultTable = ({
  data,
  isForm,
}: SupplierEvaluationCriterionResultProps) => {
  const totalsRow = data.reduce(
    (acc, item) => {
      acc.id = (data.length + 1).toString()
      acc.name = "المجموع"
      acc.weight += Number(item.weight)
      acc.evaluationPoints += parseFloat(item.evaluationPoints)
      acc.totalPoints += parseFloat(item.totalPoints)
      return acc
    },
    {
      id: "1000",
      name: "المجموع",
      weight: 0,
      evaluationPoints: 0,
      totalPoints: 0,
    },
  )
  // Format totalsRow values for display
  const formattedTotalsRow = {
    ...totalsRow,
    weight: totalsRow.weight.toFixed(2),
    evaluationPoints: totalsRow.evaluationPoints.toFixed(2),
    totalPoints: totalsRow.totalPoints.toFixed(2),
  }
  const tableData = [...data, formattedTotalsRow]

  return (
    <>
      <div className="bg-white rounded-lg my-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">نتيجة التقييم</h2>
        </div>
        <UITable>
          <TableHeader className="bg-cloudGray">
            <TableRow>
              {tableHeaders.map((col, index) => (
                <TableHead
                  key={index}
                  className={
                    isForm
                      ? "text-right bg-[#007C9E24] p-4 border-r-4 border-[#007497]"
                      : "text-right text-darkBlue text-lg w-1/12"
                  }
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((resultItem, index) => (
              <TableRow
                key={resultItem.id}
                className={`${index % 2 !== 0 ? "bg-cloudGray" : "bg-white"}`}
              >
                {Object.entries(resultItem)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) =>
                    !isForm ||
                    (resultItem.name === "المجموع" && key === "name") ? (
                      <TableCell key={key} className="w-1/12">
                        {value}
                      </TableCell>
                    ) : (
                      <TableCell key={key} className="w-1/12">
                        <InputField
                          label={`${resultItem.id}-${key}`}
                          name={`${resultItem.id}-${key}`}
                          placeholder=""
                          value={value}
                          disabled
                          hideLabel
                        />
                      </TableCell>
                    ),
                  )}
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </div>
    </>
  )
}

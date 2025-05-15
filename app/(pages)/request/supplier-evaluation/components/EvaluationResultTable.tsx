"use client";

import { SupplierEvaluationCriterionResult } from "@types";
import {
  Button,
  Input,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@ui";

import { ChangeEvent, useState } from "react";

interface SupplierEvaluationCriterionResultProps {
  data: SupplierEvaluationCriterionResult[];
}

const tableHeaders = [
  { label: "معدل التقييم" },
  { label: "الوزن %" },
  { label: "تقييم المورد" },
  { label: "مجموعة نقاط الموردين %" },
];

export const EvaluationResultTable = ({
  data,
}: SupplierEvaluationCriterionResultProps) => {
  const totalsRow = data.reduce(
    (acc, item) => {
      acc.id = (data.length + 1).toString();
      acc.name = "المجموع";
      acc.weight += Number(item.weight);
      acc.evaluationPoints += Number(item.evaluationPoints);
      acc.totalPoints += Number(item.totalPoints);
      return acc;
    },
    {
      id: "1000",
      name: "المجموع",
      weight: 0,
      evaluationPoints: 0,
      totalPoints: 0,
    }
  );
  const tableData = [...data, totalsRow];

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">نتيجة التقييم</h2>
        </div>
        <UITable>
          <TableHeader className="bg-cloudGray">
            <TableRow>
              {tableHeaders.map((col, index) => (
                <TableHead
                  key={index}
                  className="text-right text-darkBlue text-lg w-1/12"
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
                  .map(([key, value]) => (
                    <TableCell key={key} className="w-1/12">
                      {value}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </div>
    </>
  );
};

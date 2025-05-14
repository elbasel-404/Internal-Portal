"use client";

import { SupplierKPI } from "@types";
import { PrinterIcon } from "@icons";
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
  data: SupplierKPI;
}

const tableHeaders = [
  { label: "معايير التقييم" },
  { label: "القياس" },
  { label: "نقاط المورد" },
  { label: "نقاط التقييم" },
  { label: "ملاحظات" },
];

export const EvaluationCriteriaTableStatistics = ({
  data,
}: SupplierEvaluationCriterionResultProps) => {
  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">تقييم الأداء</h2>
          <div className="flex gap-4 items-center">
            <Button className="flex items-center truncate gap-1 py-2 px-4 text-sm rounded-xl font-medium w-fit bg-primary-opacity text-primary">
              <PrinterIcon className="fill-primary group-hover:fill-primary" />
              طباعة الطلب
            </Button>
          </div>
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
            {
              <TableRow className={"bg-white"}>
                {Object.entries(data)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <TableCell key={key} className="w-1/12">
                      {value}
                    </TableCell>
                  ))}
              </TableRow>
            }
          </TableBody>
        </UITable>
      </div>
    </>
  );
};

"use client";

import { SupplierEvaluationCriterionResult } from "@types";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@ui";
import Link from "next/link";
import { CirclePlusIcon } from "@icons";

interface SupplierEvaluationCriterionResultProps {
  data: SupplierEvaluationCriterionResult[];
}

const tableHeaders = [
  { label: "البلاد" },
  { label: "المدينة" },
  { label: "الاجراءات" },
];

export const EvaluationResultTable = ({
  data,
}: SupplierEvaluationCriterionResultProps) => {
  return (
    <>
      <div className="bg-white rounded-lg my-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">مكان الانتداب</h2>

          <Link
            href={""}
            className="flex group font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
          >
            <CirclePlusIcon className="fill-white group-hover:fill-primary" />
            اضافة مكان الانتداب
          </Link>
        </div>
        <UITable>
          <TableHeader className="bg-cloudGray">
            <TableRow>
              {tableHeaders.map((col, index) => (
                <TableHead
                  key={index}
                  className={"text-right text-darkBlue text-lg w-1/12"}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item.id}
                className={`${index % 2 !== 0 ? "bg-cloudGray" : "bg-white"}`}
              >
                {Object.entries(item).filter(([key]) => key !== "id").map(([key, value]) => (
                  <TableCell key={key} className="w-1/12">
                    {value}
                  </TableCell>
                ))}
                <TableCell className="w-1/12">الاجراءات</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </div>
    </>
  );
};

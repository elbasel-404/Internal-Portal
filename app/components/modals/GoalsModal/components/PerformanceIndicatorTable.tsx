"use client";

import { FolderWithSearchIcon } from "@icons";
import { Indicator } from "@types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui";
import { useState } from "react";
import { AddNewGoalButton } from "./AddNewGoalButton";
import { IndicatorRow } from "./IndicatorRow";

const headers = [
  { label: "مؤشر الأداء" },
  { label: "وزن المؤشر" },
  { label: "خطوات الإنجاز" },
  { label: "مقياس المؤشر" },
  { label: "نوع المستهدف" },
  { label: "المستهدف (رقم/تاريخ)" },
];

interface PerformanceIndicatorsTableProps {
  indicatorData: Indicator[];
}

const PerformanceIndicatorsTable = ({
  indicatorData,
}: PerformanceIndicatorsTableProps) => {
  const [indicators, setIndicators] = useState<Indicator[]>(indicatorData);

  const handleIndicatorChange = (updatedIndicator: Indicator) => {
    setIndicators((prevIndicators) =>
      prevIndicators.map((ind) =>
        ind.id === updatedIndicator.id ? updatedIndicator : ind
      )
    );
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-4 px-[18px] border-r-[3px] border-r-primary">
        <p className="text-xl font-bold text-foreground">مؤشر الأداء</p>
      </div>

      <Table>
        <TableHeader className="bg-cloudGray">
          <TableRow>
            {headers.map((head, index) => (
              <TableHead
                key={index}
                className="text-right text-darkBlue text-sm px-4"
              >
                {head.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {indicators.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <div className="flex flex-col items-center justify-center gap-6">
                  <FolderWithSearchIcon />
                  <p className="text-grey-400 text-xl font-medium">
                    لم يعثر على أي سجلات
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            indicators.map((indicator) => (
              <IndicatorRow
                key={indicator.id}
                indicator={indicator}
                onIndicatorChange={handleIndicatorChange}
              />
            ))
          )}
        </TableBody>
      </Table>

      <div className="px-4 flex flex-col gap-4 mt-6">
        <AddNewGoalButton modalName="IndicatorModal">
          إضافة مؤشر جديد
        </AddNewGoalButton>
        <div className="w-full p-4 bg-[#00A65A] bg-opacity-15 rounded-lg mt-4">
          <h3 className="text-darkBlue font-medium mb-2">
            الحد الأدنى لعدد مؤشرات الأداء: 2، مع تحديد وزن كل مؤشر بين 5% و95%.
          </h3>
          <div className="w-full bg-white h-3">
            <div
              className="bg-[#00A65A] h-3 transition-all duration-300"
              style={{ width: `100%` }}
            />
          </div>
          <div className="font-medium text-foreground text-lg">{100}%</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceIndicatorsTable;

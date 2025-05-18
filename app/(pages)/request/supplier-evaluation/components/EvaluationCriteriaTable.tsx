"use client";

import { SupplierKPI, SupplierEvaluationCriterion } from "@types";
import { PrinterIcon } from "@icons";
import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
  PieChartElem,
} from "@ui";
import { colors } from "@lib";
import { EvaluationCriteriaItems } from "./EvaluationCriteriaItems";

interface SupplierEvaluationCriterionResultProps {
  data: SupplierKPI;
  evaluationCriteriaData: SupplierEvaluationCriterion[];
  isForm?: boolean;
}

const tableHeaders = [
  { label: "معايير التقييم" },
  { label: "القياس" },
  { label: "نقاط المورد" },
  { label: "نقاط التقييم" },
  { label: "ملاحظات" },
];

export const EvaluationCriteriaTable = ({
  data,
  evaluationCriteriaData,
  isForm,
}: SupplierEvaluationCriterionResultProps) => {

  const evaluationPoints = data.evaluationPoints.map((item) => parseInt(item.split("-")[0]));

  const chartContainers = [
    {
      className: "bg-[#00A65A]",
      label: data.evaluationPoints[0],
      pieChartData: [
        { stat: "مكتمل", percentage: evaluationPoints[0], fill: "#2ACF83" },
        {
          stat: "غير مكتمل",
          percentage: 100 - evaluationPoints[0],
          fill: "var(--color-notCompleted)",
        },
      ],
      pieChartConfig: {
        completed: {
          label: "مكتمل",
          color: "#2ACF83",
        },
        notCompleted: {
          label: "غير مكتمل",
          color: colors.light.white,
        },
      },
    },
    {
      className: "bg-[#F39C12]",
      label: data.evaluationPoints[1],
      pieChartData: [
        { stat: "مكتمل", percentage: evaluationPoints[1], fill: "#FDBB39" },
        {
          stat: "غير مكتمل",
          percentage: 100 - evaluationPoints[1],
          fill: "var(--color-notCompleted)",
        },
      ],
      pieChartConfig: {
        completed: {
          label: "مكتمل",
          color: "#FDBB39",
        },
        notCompleted: {
          label: "غير مكتمل",
          color: colors.light.white,
        },
      },
    },
    {
      className: "bg-[#DD4B39]",
      label: data.evaluationPoints[2],
      pieChartData: [
        { stat: "مكتمل", percentage: evaluationPoints[2], fill: "#F15143" },
        {
          stat: "غير مكتمل",
          percentage: 100 - evaluationPoints[2],
          fill: "var(--color-notCompleted)",
        },
      ],
      pieChartConfig: {
        completed: {
          label: "مكتمل",
          color: "#F15143",
        },
        notCompleted: {
          label: "غير مكتمل",
          color: colors.light.white,
        },
      },
    },
  ];

  return (
    <>
      <div className="bg-white">
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
                  .map(([key, value], keyIndex) =>
                    key !== "evaluationPoints" ? (
                      <TableCell key={key} className="w-1/12">
                        {value}
                      </TableCell>
                    ) : (
                      <TableCell key={key} className="w-1/12 p-0">
                        <div className="flex flex-col md:flex-row">
                          {chartContainers.map((item, index) => (
                            <div className={item.className}>
                              <PieChartElem
                                size={2}
                                thickness={8}
                                percentage={evaluationPoints[index]}
                                percentageSize="text-base"
                                percentageColor="fill-white"
                                nameKey="stat"
                                dataKey="percentage"
                                chartConfig={item.pieChartConfig}
                                chartData={item.pieChartData}
                                pieChartHeight="57"
                              />
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    )
                  )}
              </TableRow>
            }
          </TableBody>
        </UITable>
        <EvaluationCriteriaItems data={evaluationCriteriaData} isForm={isForm}/>
      </div>
    </>
  );
};

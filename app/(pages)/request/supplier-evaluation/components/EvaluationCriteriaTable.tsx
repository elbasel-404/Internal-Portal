"use client";

import { KPIsTable } from "./KPIsTable";
import { SupplierEvaluationCriterion } from "@types";
import { Button } from "@ui";
import { ChangeEvent, useState } from "react";

interface SupplierEvaluationCriterionProps {
  data: SupplierEvaluationCriterion[];
}

export const EvaluationCriteriaTable = ({
  data,
}: SupplierEvaluationCriterionProps) => {
  return (
    <>
      {data.map((criteria) => (
        <KPIsTable data={criteria.kpis} />
      ))}
    </>
  );
};

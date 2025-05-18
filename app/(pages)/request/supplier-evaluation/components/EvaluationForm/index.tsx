import { FormHeader, SubmitButton } from "@components/form";
import { paths } from "@lib";
import { SupplierEvaluationCriterionResult, SupplierKPI } from "@types";
import { RequestDetailsForm } from "./RequestDetailsForm";
import { getSupplierEvaluationRequestCriteria } from "@server";
import {
  EvaluationCriteriaTable,
  EvaluationResultTable,
} from "../../components";

export const EvaluationForm = async () => {
  const evaluationCriteriaData =
    (await getSupplierEvaluationRequestCriteria("1")) || [];

  const evaluationResultData: SupplierEvaluationCriterionResult[] =
    evaluationCriteriaData?.map((item) => {
      const totalPointsValue = item.kpis.reduce((sum, kpi) => {
        return sum + parseFloat(kpi.pointsValue);
      }, 0);
      const evaluationPoints = (totalPointsValue / item.kpis.length).toFixed(2).toString();
      const totalPoints = ((parseFloat(item.weight) * parseFloat(evaluationPoints)) / 100).toFixed(2).toString();
      return {
        id: item.id,
        name: item.name,
        weight: item.weight,
        evaluationPoints,
        totalPoints,
      };
    }) || [];

  const CriteriaStatistics: SupplierKPI = {
    id: "0000",
    name: "",
    measurement: "",
    pointsValue: "",
    evaluationPoints: ["90-100", "70-89", "50-69"],
    notes: "لا يوجد",
  };

  return (
    <main>
      <div className="bg-white rounded-md">
        <FormHeader label="نموذج طلب الوثيقة" path={paths.supplierEvaluation.href} />
        <RequestDetailsForm />
      </div>

      <EvaluationCriteriaTable
        data={CriteriaStatistics}
        evaluationCriteriaData={evaluationCriteriaData}
        isForm
      />
      <EvaluationResultTable data={evaluationResultData} isForm/>

      <SubmitButton />
    </main>
  );
};


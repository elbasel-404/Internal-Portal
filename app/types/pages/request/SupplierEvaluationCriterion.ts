import { SupplierKPI } from '@types';


export type SupplierEvaluationCriterion = {
  id: string;
  name: string;
  kpis: SupplierKPI[];
};

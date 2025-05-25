import { getEvaluationGoals } from '@server';
import { EvaluationGoalsTable } from './components';

const EvaluationGoalsListPage = async () => {
  const EvaluationGoalsData = await getEvaluationGoals();
  return (
    <div className='mb-12'>
      <EvaluationGoalsTable data={EvaluationGoalsData} />
    </div>
  );
};

export default EvaluationGoalsListPage;

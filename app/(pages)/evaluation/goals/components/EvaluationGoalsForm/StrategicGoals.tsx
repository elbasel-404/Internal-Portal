import { GoalRequest } from '@types';

interface StrategicGoalsProps {
  goalsData: GoalRequest[];
}

export const StrategicGoals = ({ goalsData }: StrategicGoalsProps) => {
  const firstCorporateGoal = goalsData.map((goal) => goal.firstCorporateGoal);
  const secondStrategicGoal = goalsData.map((goal) => goal.secondStrategicGoal);
  const thirdStrategicGoal = goalsData.map((goal) => goal.thirdStrategicGoal);
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-3 bg-gray-50 p-4 gap-4'>
      <div className='w-full flex flex-col gap-1 bg-white rounded-md p-4'>
        <h2 className='text-grey-600 text-sm'>الهدف المؤسسي مستوى أول</h2>
        <p className='text-black'>{firstCorporateGoal}</p>
      </div>
      <div className='w-full flex flex-col gap-1 bg-white rounded-md p-4'>
        <h2 className='text-grey-600 text-sm'>الهدف الاستراتيجي مستوى ثاني</h2>
        <p className='text-black'>{secondStrategicGoal}</p>
      </div>
      <div className='w-full flex flex-col gap-1 bg-white rounded-md p-4'>
        <h2 className='text-grey-600 text-sm'>الهدف الاستراتيجي مستوى ثالث</h2>
        <p className='text-black'>{thirdStrategicGoal}</p>
      </div>
    </div>
  );
};

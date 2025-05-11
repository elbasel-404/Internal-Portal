import { Instructions } from '@components';
import { getRulesRequests } from '@server';
import RulesPolicy from './components/RulesPolicy';

const RulesPage = async () => {
  const rulesData = await getRulesRequests();
  return (
    <>
      <RulesPolicy rulesData={rulesData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذة الخدمة للموظفين امكانية البحث عن الموظفين بالايميل او البحث بالاسم الأول او الاسم الاخير او الاسم الانجليزي او رقم الجوالي او رقم التحويلة او الادارة او القطاع'
      />
    </>
  );
};

export default RulesPage;

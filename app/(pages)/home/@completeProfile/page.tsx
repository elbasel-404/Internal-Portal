import { paths } from '@lib';
import { CompleteProfile } from '../components';

const CompleteProfileSlot = () => {
  return (
    <CompleteProfile
      percent={30}
      progressItems={[
        { title: 'البريد الإلكتروني', percentage: 60, link: '/' },
        { title: 'رقم الجوال', percentage: 80, link: '/' },
        { title: 'العنوان', percentage: 40, link: '/' },
        {
          title: 'اتفاقية عدم الإفصاح',
          percentage: 20,
          link: paths.obligation.href,
        },
        { title: 'سياسة الأمان', percentage: 20, link: '/' },
      ]}
    />
  );
};

export default CompleteProfileSlot;

import { paths } from '@lib';
import { Route } from 'next';
import { IconKey } from './SidebarIcons';

interface MenuItem {
  iconKey: IconKey;
  label: string;
  href: Route;
  hasSubMenu?: boolean;
  subMenuItems?: MenuItem[];
}

export const MenuItems: MenuItem[] = [
  { iconKey: 'Home', label: 'الرئيسية', href: '/' },
  {
    iconKey: 'Citizen',
    label: 'خدمات الموظفين',
    hasSubMenu: true,
    href: '#',
    subMenuItems: [
      { iconKey: 'Box', label: 'متابعة طلباتي', href: paths.home.href },
      { iconKey: 'PalmTree', label: 'الاجازات', href: paths.vacations.href },
      { iconKey: 'Calendar', label: 'الاستئذان', href: paths.permissions.href },
      { iconKey: 'Map', label: 'طلب عمل عن بعد', href: paths.remoteWork.href },
      { iconKey: 'Timer', label: 'الانتدابات', href: '/' },
      {
        iconKey: 'UserWithClock',
        label: 'الحضور والانصراف',
        href: '#',
        hasSubMenu: true,
        subMenuItems: [
          {
            iconKey: 'UserWithClock',
            label: 'سجل الحضور',
            href: paths.attendanceList.href,
          },
          {
            iconKey: 'UserWithClock',
            label: 'حضور الموظفين',
            href: paths.employeeAttendance.href,
          },
        ],
      },
      {
        iconKey: 'Fingerprint',
        label: 'طلب تبرير حضور أو انصراف',
        href: '/',
      },
      {
        iconKey: 'FolderWithPlus',
        label: 'طلب خطاب الموارد البشرية',
        href: paths.hrLetter.href,
      },
      { iconKey: 'UserDetails', label: 'طلب تغيير الحساب البنكي', href: '/' },
      {
        iconKey: 'Shield',
        label: 'طلب تأمين طبي',
        href: paths.medicalInsurance.href,
      },
      { iconKey: 'DashedCircle', label: 'طلب شراء', href: '/' },
      { iconKey: 'List', label: 'طلبات المرافق والخدمات والادارية', href: '/' },
      { iconKey: 'Dollar', label: 'طلب استعاضة / اقفال عهدة', href: '/' },
      {
        iconKey: 'ChartWithArrow',
        label: 'تقييم فترة التجربة',
        href: paths.probationPeriod.href,
      },
      { iconKey: 'Bag', label: 'طلبات التوظيف', href: '/' },
    ],
  },
  {
    iconKey: 'InternalSystems',
    label: 'الأنظمة الداخلية',
    hasSubMenu: true,
    href: '#',
    subMenuItems: [
      { iconKey: 'Info', label: 'مركز الطلبات والدعم', href: '/' },
      { iconKey: 'Users', label: 'ادارة علاقات العملاء', href: '/' },
      { iconKey: 'Buckle', label: 'سهل +', href: '/' },
      { iconKey: 'List', label: 'نظام ادارة المهام', href: '/' },
      { iconKey: 'Chart', label: 'الأداء المالي', href: '/' },
      { iconKey: 'Indicator', label: 'مؤشرات وبيانات المدفوعات', href: '/' },
      { iconKey: 'Files', label: 'نظام ادارة الملفات (ايثاق)', href: '/' },
      { iconKey: 'Board', label: 'نظام ادارة المشاريع', href: '/' },
      { iconKey: 'FileWithRightArrow', label: 'نظام المحفوظات', href: '/' },
      { iconKey: 'Shield', label: 'معمل ابتكار الخدمات', href: '/' },
      { iconKey: 'Cylinder', label: 'مركز المعلومات', href: '/' },
      { iconKey: 'Key', label: 'استعادة كلمة المرور', href: '/' },
      { iconKey: 'Phone', label: 'الهاتف الشبكي', href: '/' },
      { iconKey: 'Printer', label: 'رمز الطابعة', href: '/' },
    ],
  },
  {
    iconKey: 'News',
    label: 'الأخبار والإعلانات',
    hasSubMenu: true,
    href: '#',
    subMenuItems: [
      { iconKey: 'Save', label: 'الاخبار', href: '/' },
      { iconKey: 'BookAlt', label: 'اعلانات داخلية', href: '/' },
      { iconKey: 'T', label: 'عائلة منشآت', href: '/' },
    ],
  },
  { iconKey: 'Search', label: 'البحث عن موظف', href: '/' },
  { iconKey: 'Surveys', label: 'الاستبيانات', href: '/' },
  { iconKey: 'Balance', label: 'اللوائح والأنظمة', href: '/' },
  { iconKey: 'Book', label: 'مكتبة الجودة الالكترونية', href: '/' },
  { iconKey: 'File', label: 'الإبلاغ عن المخالفات', href: '/' },
  { iconKey: 'Mobile', label: 'تطبيق الموظفين', href: '/' },
  { iconKey: 'User', label: 'لوحة بيانات الموارد البشرية', href: '/' },
];

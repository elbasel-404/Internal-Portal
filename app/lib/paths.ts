import type { Route } from "next";

// app/lib/paths.ts
type AppPath = {
  title: string;
  href: string;
};

export const paths: Record<string, AppPath> = {
  home: {
    title: "الرئيسية",
    href: "/home" as Route,
  },
  employeeApplication: {
    title: "تطبيق الموظفين",
    href: "/employee-application" as Route,
  },
  transactionList: {
    title: "قائمة المعاملات",
    href: "/transaction-list",
  },
  searchEmployee: {
    title: "البحث عن الموظفين",
    href: "/search-employee",
  },
  employeeDepartment: {
    title: "في نفس الإدارة",
    href: "/employee-department",
  },
  surveys: {
    title: "الاستبيانات",
    href: "/surveys",
  },
  rules: {
    title: "اللوائح و الأنظمة",
    href: "/rules",
  },
  crm: {
    title: "إدارة علاقات العملاء",
    href: "https://crm.monshaat.gov.sa/",
  },
  users: {
    title: "قائمة المستخدمين",
    href: "/test-1",
  },
  sahlPlus: {
    title: "سهل+",
    href: "https://shlplussmea.mc.gov.sa/",
  },
  financePerformance: {
    title: "الأداء المالي",
    href: "https://ic.monshaat.gov.sa/reports/powerbi/VG/Finance%20Performance",
  },
  taskManagement: {
    title: "نظام إدارة المهام",
    href: "https://mtm.monshaat.gov.sa/",
  },
  paymentsIndicators: {
    title: "مؤشرات و بيانات المدفوعات",
    href: "https://ic.monshaat.gov.sa/reports/powerbi/Accounts%20Payable/AP%20Dashboard",
  },
  ethaq: {
    title: "نظام إدارة الملفات",
    href: "https://ethaq.monshaat.gov.sa/index.php/login",
  },
  pmo: {
    title: "نظام إدارة المشاريع",
    href: "https://pmo.monshaat.gov.sa",
  },
  mahfouzat: {
    title: "نظام المحفوظات",
    href: "https://mahfouzat.monshaat.gov.sa/opac",
  },
  lab: {
    title: "معامل ابتكار الخدمات",
    href: "https://dolab.monshaat.sa",
  },
  informationCenter: {
    title: "مركز المعلومات",
    href: "https://ic.monshaat.gov.sa",
  },
  resetPassword: {
    title: "استعادة كلمة المرور",
    href: "https://ads.monshaat.gov.sa/",
  },
  phone: {
    title: "الهاتف الشبكي",
    href: "https://ho-cucm-pub.monshaat.gov.sa/ucmuser/",
  },
  printer: {
    title: "رمز الطابعة",
    href: "http://ruh-ho-hpac-bf/ad-authenticator/mycode.aspx",
  },
  qualityLibrary: {
    title: "مكتبة الجودة الإلكترونية",
    href: "https://ethaq.monshaat.gov.sa/index.php/apps/files/?dir=/%D9%85%D9%83%D8%AA%D8%A8%D8%A9%20%D8%A7%D9%84%D8%AC%D9%88%D8%AF%D8%A9%20%D8%A7%D9%84%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9&fileid=2572661",
  },
  reportViolations: {
    title: "الإبلاغ عن المخالفات",
    href: "Whistleblow@monshaat.gov.sa" as Route,
  },
  dashboard: {
    title: "لوحة بيانات الموارد البشرية",
    href: "https://ic.monshaat.gov.sa/reports/powerbi/HR/Dashboard%20Monshaat%20HR",
  },
  obligation: {
    title: "الإفصاح",
    href: "/obligation",
  },
  vacations: {
    title: "قائمة الاجازات",
    href: "/request/vacations",
  },
  newVacation: {
    title: "طلب اجازة",
    href: "/request/vacations/new",
  },
  vacationDetails: {
    title: "تفاصيل اجازة",
    href: "/request/vacations/details/:id",
  },
  permissions: {
    title: "قائمة طلب الاستئذان",
    href: "/request/permissions",
  },
  newPermission: {
    title: "طلب استئذان",
    href: "/request/permissions/new",
  },
  permissionDetails: {
    title: "تفاصيل استئذان",
    href: "/request/permissions/details/:id",
  },
  remoteWork: {
    title: "قائمة طلبات العمل عن بعد",
    href: "/request/remote-work",
  },
  newRemoteWork: {
    title: "طلب العمل عن بعد",
    href: "/request/remote-work/new",
  },
  remoteWorkDetails: {
    title: "تفاصيل العمل عن بعد",
    href: "/request/remote-work/details/:id",
  },
  hrLetter: {
    title: "قائمة طلبات خطاب الموارد البشرية",
    href: "/request/hr-letter",
  },
  newHrLetter: {
    title: "طلب خطاب الموارد البشرية",
    href: "/request/hr-letter/new",
  },
  hrLetterDetails: {
    title: "تفاصيل خطاب الموارد البشرية",
    href: "/request/hr-letter/details/:id",
  },
  attendanceList: {
    title: "قائمة الحضور والإنصراف",
    href: "/request/attendance/attendance-list",
  },
  employeeAttendance: {
    title: "حضور و إنصراف الموظفين اليومي",
    href: "/request/attendance/employee-attendance",
  },
  medicalInsurance: {
    title: "قائمة طلبات التأمين الطبي",
    href: "/request/medical",
  },
  newMedicalInsurance: {
    title: "طلب تأمين طبي",
    href: "/request/medical/new",
  },
  medicalInsuranceDetails: {
    title: "تفاصيل طلب تأمين طبي",
    href: "/request/medical/details/:id",
  },
  probationPeriod: {
    title: "قائمة طلبات فترة التقييم",
    href: "/request/probation-period",
  },
  newProbationPeriod: {
    title: "طلب تقييم فترة التجربة",
    href: "/request/probation-period/new",
  },
  probationPeriodDetails: {
    title: "تفاصيل تقييم فترة التجربة",
    href: "/request/probation-period/details/:id",
  },
  bankAccountChange: {
    title: "قائمة طلبات تغيير الحسابات البنكية",
    href: "/request/bank-account-change",
  },
  bankAccountChangeNew: {
    title: "طلب تغيير الحساب البنكي",
    href: "/request/bank-account-change/new",
  },
  bankAccountChangeDetails: {
    title: "تفاصيل طلب تغيير الحساب البنكي",
    href: "/request/bank-account-change/details/:id",
  },
  jobApplications: {
    title: "قائمة طلبات التوظيف",
    href: "/request/job-applications",
  },
  jobApplicationsNew: {
    title: "طلب توظيف",
    href: "/request/job-applications/new" as Route,
  },
  jobApplicationsDetails: {
    title: "تفاصيل طلب التوظيف",
    href: "/request/job-applications/details/:id",
  },
  replacementCovenant: {
    title: "قائمة طلبات الاستعاضة - إقفال العهدة",
    href: "/request/replacement-covenant" as Route,
  },
  replacementCovenantNew: {
    title: "طلب الاستعاضة - إقفال العهدة",
    href: "/request/replacement-covenant/new" as Route,
  },
  replacementCovenantDetails: {
    title: "تفاصيل طلب الاستعاضة - إقفال العهدة",
    href: "/request/replacement-covenant/details/:id",
  },
  tickets: {
    title: "تذاكر الطلبات والدعم",
    href: "/request/ticket" as Route,
  },
  ticketsNew: {
    title: "إنشاء تذكرة جديدة",
    href: "/request/ticket/new" as Route,
  },
  ticketsDetails: {
    title: "تفاصيل التذكرة",
    href: "/request/ticket/details/:id",
  },
  newsList: {
    title: "الأخبار والإعلانات",
    href: "/news" as Route,
  },
  pressFile: {
    title: "الملف الصحفي",
    href: "/news/press-file",
  },
  pressFileDetails: {
    title: "تفاصيل الملف الصحفي",
    href: "/news/press-file/details/:id",
  },
  news: {
    title: "الأخبار",
    href: "/news/news",
  },
  newsDetails: {
    title: "تفاصيل الخبر",
    href: "/news/news/details/:id",
  },
  monshaatFamily: {
    title: "عائلة منشأت",
    href: "/news/monshaat-family",
  },
  monshaatFamilyDetails: {
    title: "تفاصيل عائلة منشأت",
    href: "/news/monshaat-family/details/:id",
  },
  internalAds: {
    title: "الإعلانات الداخلية",
    href: "/news/internal-ads",
  },
  internalAdsDetails: {
    title: "تفاصيل الإعلان الداخلي",
    href: "/news/internal-ads/details/:id",
  },
  internalCoursesList: {
    title: "الدورات الداخلية",
    href: "/request/internal-courses-calendar",
  },
  internalCoursesDetails: {
    title: "تفاصيل الدورة الداخلية",
    href: "/request/internal-courses-calendar/details/:id",
  },
  userProfile: {
    title: "الملف الشخصي",
    href: "/profile",
  },
  passports: {
    title: "قائمة طلبات تحديث بيانات الجواز",
    href: "/request/passport",
  },
  passportsNew: {
    title: "طلب تحديث بيانات الجواز",
    href: "/request/passport/new",
  },
  employeeMembers: {
    title: "قائمة طلبات تحديث أفراد الأسرة",
    href: "/request/employee-members",
  },
  employeeMembersNew: {
    title: "طلب تحديث أفراد الأسرة",
    href: "/request/employee-members/new",
  },
  employeeMembersDetails: {
    title: "قائمة طلبات تحديث بيانات أفراد الأسرة",
    href: "/request/employee-members/details/:id",
  },
  overtimeConfirm: {
    title: "قائمة طلبات تأكيد العمل الإضافي",
    href: "/request/overtime-confirm",
  },
  overtimeConfirmNew: {
    title: "طلب تأكيد العمل الإضافي",
    href: "/request/overtime-confirm/new",
  },
  overtimeConfirmDetails: {
    title: "تفاصيل تأكيد العمل الإضافي",
    href: "/request/overtime-confirm/details/:id",
  },
  overtimeAssignment: {
    title: "قائمة طلبات تكليف للعمل الإضافي",
    href: "/request/overtime-assignment",
  },
  overtimeAssignmentNew: {
    title: "طلب تكليف للعمل الإضافي",
    href: "/request/overtime-assignment/new",
  },
  overtimeAssignmentDetails: {
    title: "تفاصيل تكليف العمل الإضافي",
    href: "/request/overtime-assignment/details/:id",
  },
  workDocument: {
    title: "قائمة طلبات إصدار وثيقة عمل",
    href: "/request/work-document",
  },
  workDocumentNew: {
    title: "طلب إصدار وثيقة عمل",
    href: "/request/work-document/new",
  },
  workDocumentDetails: {
    title: "تفاصيل طلب إصدار وثيقة",
    href: "/request/work-document/details/:id",
  },
  resignation: {
    title: "قائمة طلبات إنهاء خدمة",
    href: "/request/resignation",
  },
  resignationNew: {
    title: "طلب إنهاء خدمة",
    href: "/request/resignation/new",
  },
  resignationDetails: {
    title: "تفاصيل طلب إنهاء خدمة",
    href: "/request/resignation/details/:id",
  },
  custody: {
    title: "قائمة طلبات العهدة",
    href: "/request/custody",
  },
  custodyNew: {
    title: "طلب العهدة",
    href: "/request/custody/new",
  },
  custodyDetails: {
    title: "تفاصيل طلب العهدة",
    href: "/request/custody/details/:id",
  },
  recommendation: {
    title: "قائمة الترشيحات",
    href: "/request/recommendations",
  },
  recommendationDetails: {
    title: "نفاصيل طلب الترشيح",
    href: "/request/recommendations/details/:id",
  },
  purchase: {
    title: "قائمة طلبات الشراء",
    href: "/request/purchase",
  },
  purchaseNew: {
    title: "طلب شراء",
    href: "/request/purchase/new",
  },
  purchaseDetails: {
    title: "تفاصيل طلب الشراء",
    href: "/request/purchase/details/:id",
  },
  supplierEvaluation: {
    title: "قائمة طلب تقييم اداء المتعاقدين",
    href: "/request/supplier-evaluation",
  },
  supplierEvaluationDetails: {
    title: "تفاصيل طلب تقييم اداء المتعاقدين",
    href: "/request/supplier-evaluation/details/:id",
  },
  supplierEvaluationNew: {
    title: "طلب تقييم اداء المتعاقدين",
    href: "/request/supplier-evaluation/new",
  },
  batchDetails: {
    title: "تفاصيل الدفعة",
    href: "/request/batch/details/:id",
  },
  login: {
    title: "login",
    href: "/login",
  },
  deputations: {
    title: 'قائمة الإنتدابات',
    href: '/request/deputations',
  },
  deputationDetails: {
    title: 'تفاصيل إنتداب',
    href: '/request/deputations/details/:id',
  },
  deputationNew: {
    title: 'طلب إنتداب',
    href: '/request/deputations/new',
  },
};

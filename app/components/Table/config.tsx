import {
  BriefcaseIcon,
  CashRegisterIcon,
  CheckIcon,
  ClipboardCheckIcon,
  HourGlassIcon,
  ListTimelineIcon,
  RejectIcon,
  SandClock2Icon,
  TagsIcon,
  UserIcon,
  UserWithXMarkIcon,
  XMarkIcon,
} from "@icons"

/**
 * Status mapping for consistent usage across component
 */
export const STATUS_CONFIG = {
  done: {
    label: "اعتمد",
    icon: CheckIcon,
    className: "text-success-foreground bg-success",
  },
  confirm: {
    label: "اعتمد",
    icon: CheckIcon,
    className: "text-success-foreground bg-success",
  },
  اعتمد: {
    label: "اعتمد",
    icon: CheckIcon,
    className: "text-success-foreground bg-success",
  },
  refuse: {
    label: "مرفوض",
    icon: XMarkIcon,
    className: "text-destructive-foreground bg-destructive-opacity",
  },
  مرفوض: {
    label: "مرفوض",
    icon: XMarkIcon,
    className: "text-destructive-foreground bg-destructive-opacity",
  },
  "تم الإلغاء": {
    label: "تم الإلغاء",
    icon: RejectIcon,
    className: "text-stormGray bg-primary-opacity",
  },
  "تحت الإجراء": {
    label: "تحت الإجراء",
    icon: SandClock2Icon,
    className: "bg-primary-opacity text-primary",
  },
  draft: {
    label: "طلب",
    icon: BriefcaseIcon,
    className: "bg-primary-opacity text-primary",
  },
  طلب: {
    label: "طلب",
    icon: BriefcaseIcon,
    className: "bg-primary-opacity text-primary",
  },
  "اتفاقية شراء": {
    label: "اتفاقية شراء",
    icon: BriefcaseIcon,
    className: "bg-primary-opacity text-primary",
  },
  dm: {
    label: "المدير المباشر",
    icon: UserIcon,
    className: "bg-primary-opacity text-primary",
  },
  "المدير المباشر": {
    label: "المدير المباشر",
    icon: UserIcon,
    className: "bg-primary-opacity text-primary",
  },
  "تحت الطرح": {
    label: "تحت الطرح",
    icon: UserIcon,
    className: "bg-primary-opacity text-primary",
  },
  employee: {
    label: "الموظف",
    icon: UserWithXMarkIcon,
    className: "bg-primary-opacity text-primary",
  },
  الموظف: {
    label: "الموظف",
    icon: UserWithXMarkIcon,
    className: "bg-primary-opacity text-primary",
  },
  غائب: {
    label: "غائب",
    icon: UserWithXMarkIcon,
    className: "bg-primary-opacity text-primary",
  },
  "تم حل الطلب": {
    label: "تم حل الطلب",
    icon: ClipboardCheckIcon,
    className: "bg-primary-opacity text-primary",
  },
  جديدة: {
    label: "جديدة",
    icon: ListTimelineIcon,
    className: "bg-primary-opacity text-primary",
  },
  جديد: {
    label: "جديد",
    icon: ListTimelineIcon,
    className: "bg-primary-opacity text-primary",
  },
  الترشح: {
    label: "الترشح",
    icon: ListTimelineIcon,
    className: "bg-primary-opacity text-primary",
  },
  candidate: {
    label: "الترشح",
    icon: ListTimelineIcon,
    className: "bg-primary-opacity text-primary",
  },
  "بإنتظار المستخدم": {
    label: "بإنتظار المستخدم",
    icon: HourGlassIcon,
    className: "bg-primary-opacity text-primary",
  },
  "عمليات الموارد البشرية": {
    label: "عمليات الموارد البشرية",
    icon: TagsIcon,
    className: "bg-primary-opacity text-primary",
  },
  "التحليل الفني": {
    label: "التحليل الفني",
    icon: TagsIcon,
    className: "bg-primary-opacity text-primary",
  },
  "مدقق مالي": {
    label: "مدقق مالي",
    icon: TagsIcon,
    className: "bg-primary-opacity text-primary",
  },
  "الترسية و التعميد": {
    label: "الترسية و التعميد",
    icon: TagsIcon,
    className: "bg-primary-opacity text-primary",
  },
  "إدارة العقود و المشتريات": {
    label: "إدارة العقود و المشتريات",
    icon: TagsIcon,
    className: "bg-primary-opacity text-primary",
  },
  "معتمد وتم أمر الصرف": {
    label: "معتمد وتم أمر الصرف",
    icon: CashRegisterIcon,
    className: "bg-primary-opacity text-primary",
  },
  hrm: {
    label: "عمليات الموارد البشرية",
    icon: TagsIcon,
    className: "bg-primary-opacity text-primary",
  },
  humain: {
    label: "عمليات الموارد البشرية",
    icon: TagsIcon,
    className: "bg-primary-opacity text-primary",
  },
  gm_humain: {
    label: "مدير عام الموارد البشرية",
    icon: TagsIcon,
    className: "bg-primary-opacity text-primary",
  },
  financial_purchasing_mgr: {
    label: "مدير عام المالية",
    icon: TagsIcon,
    className: "bg-primary-opacity text-primary",
  },
}

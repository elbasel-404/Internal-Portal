'use server';

import type { Employee } from '@types';

export const getEmployeeRequests = async (): Promise<Employee[]> => {
  return employeeRequests;
};

const employeeRequests: Employee[] = [
  {
    name: 'سعود القامري',
    position: 'مبرر عام المبادئ والخدمات الدولية',
    image: '/employee-1.svg',
    phone: '0507770500',
    recycleWork: 'تحويل العمل 4554',
    address: 'العامل الرئيسي - الدور الأرضي',
    email: 'hqushaymit@monshaat.gov.sa',
    sector: 'الخدمات المشتركة',
    generalAdministration: 'الخدمات المشتركة/المالية..',
    management: 'المرافق والخدمات الادراية',
    department: 'المرافق والخدمات الادراية',
    generalManager: 'مي بنت سعد البدراني',
    id: ''
  },
  {
    name: 'نورة العتبس',
    position: 'مبرر عام المبادئ والخدمات الدولية',
    image: '/employee-2.svg',
    phone: '0507770501',
    recycleWork: 'تحويل العمل 4554',
    address: 'العامل الرئيسي - الدور الأرضي',
    email: 'hqushaymit@monshaat.gov.sa',
    sector: 'الخدمات المشتركة',
    generalAdministration: 'الخدمات المشتركة/المالية..',
    management: 'المرافق والخدمات الادراية',
    department: 'المرافق والخدمات الادراية',
    generalManager: 'مي بنت سعد البدراني',
    id: ''
  },
  {
    name: 'عبدالله الشمري',
    position: 'مبرر عام المبادئ والخدمات الدولية',
    image: '/employee-6.svg',
    phone: '0508670500',
    recycleWork: 'تحويل العمل 4554',
    address: 'العامل الرئيسي - الدور الأرضي',
    email: 'hqushaymit@monshaat.gov.sa',
    sector: 'الخدمات المشتركة',
    generalAdministration: 'الخدمات المشتركة/المالية..',
    management: 'المرافق والخدمات الادراية',
    department: 'المرافق والخدمات الادراية',
    generalManager: 'مي بنت سعد البدراني',
    id: ''
  },
  {
    name: 'فاطمة الحربي',
    position: 'مبرر عام المبادئ والخدمات الدولية',
    image: '/employee-5.svg',
    phone: '0507260500',
    recycleWork: 'تحويل العمل 4554',
    address: 'العامل الرئيسي - الدور الأرضي',
    email: 'hqushaymit@monshaat.gov.sa',
    sector: 'الخدمات المشتركة',
    generalAdministration: 'الخدمات المشتركة/المالية..',
    management: 'المرافق والخدمات الادراية',
    department: 'المرافق والخدمات الادراية',
    generalManager: 'مي بنت سعد البدراني',
    id: ''
  },
  {
    name: 'فهد الدوسري',
    position: 'مبرر عام المبادئ والخدمات الدولية',
    image: '/employee-4.svg',
    phone: '0507150500',
    recycleWork: 'تحويل العمل 4554',
    address: 'العامل الرئيسي - الدور الأرضي',
    email: 'hqushaymit@monshaat.gov.sa',
    sector: 'الخدمات المشتركة',
    generalAdministration: 'الخدمات المشتركة/المالية..',
    management: 'المرافق والخدمات الادراية',
    department: 'المرافق والخدمات الادراية',
    generalManager: 'مي بنت سعد البدراني',
    id: ''
  },
  {
    name: 'رهف العبدلله',
    position: 'مبرر عام المبادئ والخدمات الدولية',
    image: '/employee-3.svg',
    phone: '0507890500',
    recycleWork: 'تحويل العمل 4554',
    address: 'العامل الرئيسي - الدور الأرضي',
    email: 'hqushaymit@monshaat.gov.sa',
    sector: 'الخدمات المشتركة',
    generalAdministration: 'الخدمات المشتركة/المالية..',
    management: 'المرافق والخدمات الادراية',
    department: 'المرافق والخدمات الادراية',
    generalManager: 'مي بنت سعد البدراني',
    id: ''
  },
];

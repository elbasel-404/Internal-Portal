'use client';

import {
  BriefcaseIcon,
  CheckIcon,
  ClipboardCheckIcon,
  HourGlassIcon,
  ListTimelineIcon,
  PdfFileIcon,
  ProjectorIcon,
  RejectIcon,
  SandClock2Icon,
  TagsIcon,
  UserIcon,
  UserWithXMarkIcon,
  XMarkIcon,
} from '@icons';
import type { Row } from '@types';
import {
  Button,
  Checkbox,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from '@ui';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Column {
  label: string;
}

interface TableProps {
  columns: Column[];
  rows: Row[];
  itemsPerPage?: number;
  link?: string;
  toggleId?: boolean;
  toggleStatus?: boolean;
  showCheckBox?: boolean;
  idTableHeader?: string;
  tableClassName?: string;
  onApprove?: (id: string) => void;
  onReject?: (request: Row) => void;
}

export const Table = ({
  columns,
  rows,
  itemsPerPage = 7,
  showCheckBox = false,
  link,
  idTableHeader = 'رقم الطلب',
  toggleId = true,
  toggleStatus = false,
  tableClassName = 'h-[440px]',
  onReject,
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const paginatedRequests = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRequests(
      selectAll ? [] : paginatedRequests.map((req) => req.id)
    );
  };

  const handleSelectRequest = (id: string) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectAll(false);
    setSelectedRequests([]);
  };

  return (
    <>
      <UITable className={tableClassName}>
        <TableHeader className='bg-cloudGray'>
          <TableRow>
            {toggleId && (
              <TableHead className='text-right text-darkBlue text-lg w-1/12'>
                <div className='flex items-center gap-2 mr-2'>
                  {showCheckBox && (
                    <Checkbox
                      className='rounded-none shadow-none'
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  )}
                  <span>{idTableHeader}</span>
                </div>
              </TableHead>
            )}

            {columns.map((col, index) => (
              <TableHead
                key={index}
                className='text-right text-darkBlue text-lg w-1/12'
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedRequests.map((request, index) => (
            <TableRow
              className={`${index % 2 !== 0 ? 'bg-cloudGray' : 'bg-white'}`}
              key={request.id}
            >
              {toggleId && (
                <TableCell className='w-1/12'>
                  <div className='flex items-center gap-2 mr-2'>
                    {showCheckBox && (
                      <Checkbox
                        className='rounded-none shadow-none'
                        checked={selectedRequests.includes(request.id)}
                        onCheckedChange={() => handleSelectRequest(request.id)}
                      />
                    )}
                    <Link
                      href={
                        link
                          ? ((link.replace(/:\w+$/, '') +
                              `/${request.id.replace('#', '')}`) as Route)
                          : '#'
                      }
                    >
                      <span
                        className={`${link ? 'underline text-primary' : ''}`}
                      >
                        {request.id}
                      </span>
                    </Link>
                  </div>
                </TableCell>
              )}

              {/* TODO: Move it to rows variable*/}
              {Object.entries(request)
                .filter(([key]) => key !== 'id')
                .map(([key, value]) => (
                  <TableCell key={key} className='w-1/12'>
                    {key === 'status' ? (
                      <div
                        className={`flex items-center truncate gap-1 py-2 px-4 text-sm rounded-xl font-medium w-fit ${
                          value === 'done' ||
                          value === 'اعتمد' ||
                          value === 'confirm'
                            ? 'text-success-foreground bg-success'
                            : value === 'مرفوض' || value === 'refuse'
                            ? 'text-destructive-foreground bg-destructive-opacity'
                            : value === 'تم الإلغاء'
                            ? 'text-stormGray bg-primary-opacity'
                            : 'bg-primary-opacity text-primary'
                        }`}
                      >
                        {value === 'اعتمد' ||
                        value === 'done' ||
                        value === 'confirm' ? (
                          <CheckIcon className='fill-success-foreground' />
                        ) : value === 'تحت الإجراء' ? (
                          <SandClock2Icon />
                        ) : value === 'مرفوض' || value === 'refuse' ? (
                          <XMarkIcon className='fill-destructive-foreground' />
                        ) : value === 'طلب' || value === 'draft' ? (
                          <BriefcaseIcon className='fill-primary' />
                        ) : value === 'المدير المباشر' || value === 'dm' ? (
                          <UserIcon className='fill-primary' />
                        ) : value === 'غائب' ||
                          value === 'الموظف' ||
                          value === 'employee' ? (
                          <UserWithXMarkIcon />
                        ) : value === 'تم حل الطلب' ? (
                          <ClipboardCheckIcon />
                        ) : value === 'جديدة' ||
                          value === 'جديد' ||
                          value === 'الترشح' ||
                          value === 'candidate' ? (
                          <ListTimelineIcon />
                        ) : value === 'بإنتظار المستخدم' ? (
                          <HourGlassIcon />
                        ) : value === 'تم الإلغاء' ? (
                          <RejectIcon />
                        ) : value === 'عمليات الموارد البشرية' ||
                          value === 'hrm' ||
                          value === 'humain' ||
                          value === 'gm_humain' ? (
                          <TagsIcon className='fill-primary' />
                        ) : (
                          <ProjectorIcon />
                        )}
                        {value === 'done' || value === 'confirm'
                          ? 'اعتمد'
                          : value === 'refuse'
                          ? 'مرفوض'
                          : value === 'hrm' || value === 'humain'
                          ? 'عمليات الموارد البشرية'
                          : value === 'dm'
                          ? 'المدير المباشر'
                          : value === 'employee'
                          ? 'الموظف'
                          : value === 'draft'
                          ? 'طلب'
                          : value === 'financial_purchasing_mgr'
                          ? 'مدير عام المالية'
                          : value === 'gm_humain'
                          ? 'مدير عام الموارد البشرية'
                          : value === 'candidate'
                          ? 'الترشح'
                          : value}
                      </div>
                    ) : key === 'employeeName' ? (
                      <div className='flex items-center gap-2'>
                        <Image
                          className='w-10 h-10 rounded-full cursor-pointer'
                          width={40}
                          height={40}
                          src='/demo-img.png'
                          alt='profile-picture'
                        />
                        <p className='truncate'>{value}</p>
                      </div>
                    ) : key === 'courseName' ? (
                      <Link
                        href={
                          link
                            ? ((link.replace(/:\w+$/, '') +
                                `/${request.id.replace('#', '')}`) as Route)
                            : '#'
                        }
                      >
                        <p className='text-primary'>{value}</p>
                      </Link>
                    ) : key === 'attachments' ? (
                      <div className='bg-[#FFF4CF] p-3 rounded-md w-fit'>
                        <PdfFileIcon />
                      </div>
                    ) : (
                      value
                    )}
                  </TableCell>
                ))}
              {!request.status && toggleStatus && (
                <TableCell className='flex items-center gap-3 w-1/12'>
                  <Button className='flex group gap-1 items-center shadow-none hover:bg-green-600 hover:text-white justify-end text-success-foreground bg-success rounded-xl px-4 py-2.5'>
                    <CheckIcon className='fill-success-foreground group-hover:fill-white' />
                    اعتمد
                  </Button>

                  <Button
                    onClick={() => onReject && onReject(request)}
                    className='flex group gap-1 items-center shadow-none hover:bg-red-600 hover:text-white justify-end text-destructive-foreground bg-destructive-opacity rounded-xl px-4 py-2.5'
                  >
                    <XMarkIcon className='fill-destructive-foreground group-hover:fill-white' />
                    مرفوض
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </UITable>
      <div className='flex justify-between items-center p-4'>
        <p className='text-[#78787A] text-sm font-light'>
          إظهار {Math.min(currentPage * itemsPerPage, rows.length)} من أصل{' '}
          {rows.length} طلب
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

"use client"

import { EmployeeCard, Instructions } from "@components"
import { SearchIcon } from "@icons"
import type { Employee } from "@types"
import { Button, Input, Pagination } from "@ui"
import Image from "next/image"
import { type ChangeEvent, useState } from "react"

interface SearchEmployeePageProps {
  employees: Employee[]
}

export const SearchEmployees = ({ employees }: SearchEmployeePageProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 6

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim())
    setCurrentPage(1)
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.generalAdministration
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      employee.management.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.generalManager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredEmployees.length / cardsPerPage)

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstCard,
    indexOfLastCard,
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="p-4 bg-white space-y-4 rounded-2xl min-h-screen">
        <div className="p-4 flex flex-col gap-3">
          <h1 className="text-2xl font-bold">قائمة الموظفين</h1>
          <div className="flex items-center gap-4">
            <div className="w-11/12">
              <Input
                placeholder="البحث عن الموظفين"
                icon={<SearchIcon />}
                className="text-sm text-darkBlue placeholder:text-foreground bg-cloudGray pr-10 py-2.5 min-h-12 rounded-full shadow-none border-none"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button className="rounded-full p-4 min-h-12 min-w-36 w-1/12 text-lg text-white bg-primary hover:bg-primary font-bold">
              ابحث الأن
            </Button>
          </div>
        </div>

        {currentEmployees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEmployees.map((employee, index) => (
              <div
                key={index}
                className="flex flex-col bg-background rounded-xl p-4 gap-3"
              >
                <EmployeeCard {...employee} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2 md:gap-4 lg:gap-6">
            <Image
              src="/search-empty.svg"
              alt="search icon"
              width={170}
              height={170}
              className="w-16 h-16 md:w-36 md:h-36 lg:w-44 lg:h-44"
            />
            <h2 className="text-grey-500 font-bold text-2xl md:text-4xl lg:text-5xl">
              عملية البحث
            </h2>
            <p className="text-xl md:text-3xl lg:text-4xl text-grey-400">
              عفوا لا يتوفر نتائج بحثك عن الموظفين
            </p>
          </div>
        )}

        <div className="flex justify-between items-center p-4">
          <p className="text-[#78787A] text-sm font-light">
            إظهار{" "}
            {Math.min(currentPage * cardsPerPage, filteredEmployees.length)} من
            أصل {filteredEmployees.length} مدخل
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذة الخدمة للموظفين امكانية البحث عن الموظفين بالايميل او البحث بالاسم الأول او الاسم الاخير او الاسم الانجليزي او رقم الجوالي او رقم التحويلة او الادرة او القطاع"
      />
    </>
  )
}

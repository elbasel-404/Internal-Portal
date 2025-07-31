"use client"

import {
  DownToLineIcon,
  EyeIcon,
  FileLinesIcon,
  PdfIcon,
  SearchIcon,
} from "@icons"
import { Rules } from "@types"
import { Button, Input, Pagination } from "@ui"
// import Image from "next/image"
import { useMemo, useState } from "react"

interface RulesDataProps {
  rulesData: Rules[]
}

const RulesPolicy = ({ rulesData }: RulesDataProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const itemsPerPage = 7
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(
    () => Math.ceil(rulesData.length / itemsPerPage),
    [rulesData.length, itemsPerPage],
  )

  const paginatedRequests = useMemo(() => {
    return rulesData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    )
  }, [rulesData, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const toggleDescription = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  const getPreviewText = (text: string, index: number) => {
    const limit = 150
    if (expandedIndex === index || text.length <= limit) return text
    return text.slice(0, limit) + "..."
  }

  return (
    <div className="bg-white rounded-2xl min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col xs:flex-row justify-start items-start xs:justify-between xs:items-center border-b pb-4 border-[#ECF0F480]">
        <h1 className="text-2xl font-bold sm:px-6">اللوائح والأنظمة</h1>
        <Input
          variant="icon"
          placeholder="البحث في اللوائح والأنظمة"
          className="text-sm placeholder:text-foreground pr-10 shadow-none w-fit sm:w-64"
          icon={<SearchIcon />}
        />
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {paginatedRequests.map(
          (
            {
              title,
              description,
              policyNumber,
              // sideImages,
              attachment,
              timestamp,
              download,
              // mainImage,
            },
            i,
          ) => (
            <div
              key={i}
              className="border-b border-[#F4F8FC] px-6 py-4 space-y-2"
            >
              <div className="flex items-center gap-3 rounded-full bg-primary-opacity p-3.5 pr-5">
                <FileLinesIcon />
                <p className="font-semibold text-primary text-sm sm:text-xl">
                  {title}
                </p>
              </div>
              <div
                className="text-sm text-stormGray mt-1 cursor-pointer"
                onClick={() => toggleDescription(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleDescription(i)
                    e.preventDefault()
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={expandedIndex === i}
              >
                {getPreviewText(description, i)}
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-1">
                <p className="text-foreground font-medium">
                  سياسة رقم : {policyNumber}
                </p>
                <p className="text-stormGray text-sm">بتاريخ {timestamp}</p>
              </div>
              {/* {sideImages?.length > 0 && mainImage && (
                <div className={`space-y-4`}>
                  <div
                    className={`flex flex-col md:flex-row gap-4 mt-4 ${
                      attachment ? "border-b border-[#F4F8FC] pb-4" : ""
                    }`}
                  >
                    <div className="w-full md:w-2/12 flex flex-col h-fit xl:h-[425px] gap-5">
                      {sideImages?.map((img, i) => (
                        <div
                          key={i}
                          className="relative h-fit rounded-xl overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt={`Side ${i + 1}`}
                            width={200}
                            height={200}
                            className="w-full rounded-xl h-32 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="relative w-full md:w-10/12 h-full xl:h-[425px] overflow-hidden rounded-lg">
                      <Image
                        src={mainImage || "/rules.svg"}
                        alt="Main"
                        width={800}
                        height={400}
                        className="w-full h-fit rounded-xl object-cover"
                      />
                    </div>
                  </div>
                </div>
              )} */}

              {attachment && (
                <div className="flex flex-col gap-3 mt-4">
                  <h2 className="font-medium text-foreground">عرض المرفقات</h2>
                  <div className="bg-cloudGray w-fit rounded-lg p-3.5 pr-5 flex items-center gap-3">
                    <div className="bg-white rounded-md p-3">
                      <PdfIcon />
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                      <p className="text-sm text-stormGray">{title}</p>
                      <div className="flex gap-4 items-center w-full">
                        <a
                          href={attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            className="bg-primary-opacity shadow-none hover:bg-primary-opacity"
                            size="icon"
                            icon={<EyeIcon />}
                          />
                        </a>
                        <a href={download}>
                          <Button
                            className="bg-primary-opacity shadow-none hover:bg-primary-opacity"
                            size="icon"
                            icon={<DownToLineIcon />}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ),
        )}
      </div>
      <div className="">
        {rulesData.length > 0 ? (
          <div className="flex justify-between items-center mt-4 p-4">
            <p className="text-[#78787A] text-sm font-light">
              إظهار {Math.min(currentPage * itemsPerPage, rulesData.length)} من
              أصل {rulesData.length}
            </p>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        ) : (
          <div className="w-full"></div>
        )}
      </div>
    </div>
  )
}
export default RulesPolicy

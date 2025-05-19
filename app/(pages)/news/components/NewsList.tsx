"use client";

import { SearchIcon } from "@icons";
import { NewsFamily } from "@types";
import { Input, Pagination } from "@ui";
import { ChangeEvent, useState } from "react";
import { GlobalNewsCard } from ".";

interface NewsListProps {
  title: string;
  path: string;
  newsData: NewsFamily[];
}

export const NewsList = ({ title, path, newsData }: NewsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
    setCurrentPage(1);
  };

  const filteredData = newsData.filter(
    (data) =>
      data.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentData = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4 bg-white rounded-xl py-4">
      <div className="flex items-center justify-between gap-3 px-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Input
          placeholder="البحث في الأخبار"
          icon={<SearchIcon />}
          className="text-sm text-darkBlue placeholder:text-foreground bg-cloudGray pr-10 py-2.5 min-h-12 rounded-full shadow-none border-none"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <GlobalNewsCard cardData={currentData} path={path} />

      <div className="flex justify-between items-center p-4">
        <p className="text-[#78787A] text-sm font-light">
          إظهار {Math.min(currentPage * cardsPerPage, filteredData.length)} من
          أصل {filteredData.length} مدخل
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

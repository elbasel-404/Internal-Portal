"use client";

// import { DeputationPlace  } from "@types";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
  Button,
} from "@ui";
import Link from "next/link";
import { CirclePlusIcon, TrashIcon } from "@icons";

interface DeputationPlacesProps {
  //TODO: DeputationPlace
  data: {
    id: string;
    name: string;
    city: string;
  }[];
  issueVisa: boolean;
}

const tableHeaders = [
  { label: "البلاد" },
  { label: "المدينة" },
  { label: "الاجراءات" },
];

export const PlacesTable = ({ data, issueVisa }: DeputationPlacesProps) => {
  return (
    <>
      <div className="bg-white rounded-lg m-6">
        <div className="flex border-r-4 bg-[#007C9E24] border-[#007497] py-3 px-2 mb-2">
          <div className="flex gap-2 slotHandle p-4 flex-1">
            <h2 className="text-2xl font-bold">
              مكان الانتداب <span className="text-red-500">*</span>
            </h2>
          </div>
            <Link
              href={''}
              className='flex group font-medium items-center gap-2 bg-primary text-white px-4 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary'
            >
              <CirclePlusIcon className='fill-white group-hover:fill-primary' />
              اضافة مكان الانتداب
            </Link>
        </div>
        <UITable>
          <TableHeader className="bg-cloudGray">
            <TableRow>
              {tableHeaders.map((col, index) => (
                <TableHead
                  key={index}
                  className={"text-right text-darkBlue text-lg w-1/12"}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item.id}
                className={`${index % 2 !== 0 ? "bg-cloudGray" : "bg-white"}`}
              >
                {Object.entries(item)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <TableCell key={key} className="w-1/12">
                      {value}
                    </TableCell>
                  ))}
                <TableCell className="w-1/12">
                  <Button className="flex group gap-1 items-center shadow-none hover:bg-red-600 hover:text-white justify-end text-destructive-foreground bg-destructive-opacity rounded-xl px-4 py-2.5">
                    <TrashIcon className="fill-destructive-foreground group-hover:fill-white" />
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </div>
    </>
  );
};

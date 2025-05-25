import { PdfFileIcon, PrinterIcon, TrashIcon } from "@icons";
import { CheckboxField } from "@components/form";
import { colors } from "@lib";
import type { RequestHeader } from "@types";
import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@ui";
import { cn } from "@utils";
import { ReactNode } from "react";

interface RequestDetailsProps {
  headers: RequestHeader[];
  evaluationCriteria?: ReactNode;
  requestDetailsLabel?: string;
}

type AttachmentList = {
  label: "المرفقات";
  value: File[];
};

export const RequestDetails = ({
  headers,
  evaluationCriteria,
  requestDetailsLabel = "تفاصيل الطلب",
}: RequestDetailsProps) => {
  const attachmentHeader = headers.find(({ label }) => label === "المرفقات");
  const covenantRequestNumber = headers.find(
    ({ label }) => label === "رقم طلب العهدة"
  );
  const attachmentList: AttachmentList | undefined =
    attachmentHeader && Array.isArray(attachmentHeader.value)
      ? { label: "المرفقات", value: attachmentHeader.value }
      : undefined;

  const notesHeaders = ["ملاحظات", "المهام التي سيتم العمل عليها"];

  const labelValue = (value: ReactNode | boolean, key?: string) => {
    if (typeof value === "string") {
      return (
        <div
          className="font-medium mx-3 text-darkBlue"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      );
    }  else if (typeof value === "boolean") {
      return (
        <div className="font-medium mx-3 text-darkBlue">
          <CheckboxField
            label={""}
            name={key || ""}
            className="rounded-[3px] shadow-none space-y-0"
            checked={Boolean(value)}
            disabled
          />
        </div>
      );
    }
  };

  return (
    <section className="bg-white rounded-lg py-8 px-4 mt-6">
      <h1 className="font-bold text-2xl mb-4">
        {covenantRequestNumber
          ? "بيانات استعاضة / اقفال عهدة"
          : requestDetailsLabel}
      </h1>
      <div>
        {headers .filter(({ value }) => !Array.isArray(value)).map(
          ({ label, value, key, tableHeaders }: RequestHeader, index) => {
            const isEven = index % 2 === 0;
            const isNotes = notesHeaders.includes(label);

            return (
              <div key={index}>
                {label === "رقم طلب العهدة" && (
                  <div className="text-foreground text-2xl font-bold my-3">
                    بيانات العهدة
                  </div>
                )}
                <div
                  key={label}
                  className={cn(
                    "py-[22px] flex flex-col md:flex-row items-center",
                    isEven && "bg-grey-50",
                    isNotes && "flex-col"
                  )}
                >
                  <div className="mx-3 md:basis-1/4 md:flex-1 md:max-w-[15%]">
                    {label}
                  </div>
                  {labelValue(value as ReactNode | boolean, key)}
                </div>
              </div>
            );
          }
        )}
      </div>
      <div>{evaluationCriteria}</div>
      {headers
        .filter(({ value }) => {
          return (
            Array.isArray(value) &&
            value.every((v) => v instanceof Object) &&
            !value.every((v) => v instanceof File)
          );
        })
        .map(({ label, value, tableHeaders }: RequestHeader) => (
          <RequestDetailsHeader
            key={label}
            label={label}
            data={value as []}
            tableHeaders={tableHeaders || []}
          />
        ))}
      {attachmentList && (
        <AttachmentList attachmentList={attachmentList.value} />
      )}
    </section>
  );
};

interface AttachmentListProps {
  attachmentList: File[];
}
const AttachmentList = ({ attachmentList }: AttachmentListProps) => {
  return (
    <>
      <h2 className="py-3 ">المرفقات</h2>
      <div className="space-y-[10px]">
        {Array.isArray(attachmentList) &&
          attachmentList.map((file) => (
            <FileAttachment key={file.name} file={file} />
          ))}
      </div>
    </>
  );
};

const FileAttachment = ({ file }: { file: File }) => {
  return (
    <div className="rounded-lg gap-3 px-4 flex items-center bg-grey-50 py-3 hover:bg-black/10 transition-colors cursor-pointer">
      <div className="w-10 h-10 flex bg-[#FFF4CF] items-center rounded-md justify-center">
        <PdfFileIcon className="w-4 h-4" />
      </div>
      {file.name}
      <div className="mr-auto flex gap-4">
        <Button
          className="bg-primary-opacity rounded-sm w-6 h-6 p-0"
          title="Print"
        >
          <PrinterIcon
            className="w-3 h-3"
            width={12}
            height={12}
            fill={colors.light.primary}
          />
        </Button>
        <Button
          className="bg-primary-opacity rounded-sm w-6 h-6 p-0"
          title="Delete"
        >
          <TrashIcon
            className="w-3 h-3"
            width={12}
            height={12}
            fill={colors.light.primary}
          />
        </Button>
      </div>
    </div>
  );
};

interface ResultItem {
  id: string | number;
  [key: string]: any;
}

interface RequestDetailsHeaderProps {
  label: string;
  data: ResultItem[] | ReactNode;
  tableHeaders: { label: string; key: string }[];
}

const RequestDetailsHeader = ({
  label,
  data,
  tableHeaders,
}: RequestDetailsHeaderProps) => {
  return (
    <>
      <div className="border-r-4 border-[#007497] m-4">
        <div className="bg-[#007C9E24] flex gap-2 slotHandle p-4 flex-1">
          <h2 className="text-2xl font-bold">{label}</h2>
        </div>
      </div>
      <div className="mx-4 my-2">
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
            {Array.isArray(data) &&
              (data as ResultItem[]).map((resultItem, index) => (
                <TableRow
                  key={resultItem.id}
                  className={`${index % 2 !== 0 ? "bg-cloudGray" : "bg-white"}`}
                >
                  {Object.entries(resultItem)
                    .filter(([key]) => key !== "id")
                    .map(([key, value]) => (
                      <TableCell key={key} className="w-1/12">
                        {value}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </UITable>
      </div>
    </>
  );
};

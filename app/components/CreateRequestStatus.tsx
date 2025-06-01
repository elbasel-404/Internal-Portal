"use client";

import { GreenCheckMarkIcon, PersonIcon, XMarkIcon2 } from "@icons";
import type { CreateRequestStatus as RequestType } from "@types";
import { Button } from "@ui";
import { cn } from "@utils";
import { Fragment, useState } from "react";

interface RequestStatusProps {
  status: RequestType[];
  caption: string;
}
export const CreateRequestStatus = ({
  status,
  caption,
}: RequestStatusProps) => {
  const [showCaption, setShowCaption] = useState(true);
  const length = status.length - 1;
  return (
    <div className="bg-white pt-4 pb-4 px-4 rounded-lg space-y-4">
      <div className="bg-[#FAFCFE] flex flex-col lg:flex-row items-center px-2 lg:px-8 p-6">
        {status.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ status }, index) => {
            const isLast = index === length;
            return (
              <Fragment key={index}>
                <div
                  className="relative h-32 flex lg:block w-full lg:w-auto"
                  key={index}
                >
                  <div
                    className={`relative h-16 w-16 flex flex-col justify-center items-center rounded-full border-[3px]`}
                  >
                    <PersonIcon className="fill-white" />
                    <div className="absolute w-8 h-8 rounded-full top-0 ml-16">
                      {status === "طلب" || status === "الموظف" ? (
                        <GreenCheckMarkIcon />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <h2
                    className={`text-sm mr-20 lg:mx-auto mt-4 text-center text-primary max-w-20`}
                  >
                    {status}
                  </h2>
                </div>
                <Separator isLast={isLast} />
              </Fragment>
            );
          }
        )}
      </div>
      {showCaption && (
        <RequestCaption
          caption={caption}
          onClose={() => setShowCaption(false)}
        />
      )}
    </div>
  );
};

interface SeparatorProps {
  isLast: boolean;
  dataKey?: string;
}
const Separator = ({ isLast, dataKey }: SeparatorProps) => {
  if (isLast) return null;
  return (
    <div className="h-16 flex-1 mr-2 ml-4">
      <div data-key={dataKey} className="h-1 bg-grey-200 flex-1" />
    </div>
  );
};

const RequestCaption = ({
  caption,
  onClose,
}: {
  caption: string;
  onClose: () => void;
}) => {
  return (
    <div
      className={`flex items-center justify-between bg-primary-opacity py-4 px-4 rounded-lg`}
    >
      <p
        className={`
         text-primary
          font-medium
        `}
      >
        {caption}
      </p>
      <Button onClick={onClose} className="bg-transparent shadow-none p-0">
        <XMarkIcon2 className={`fill-primary hover:cursor-pointer`} />
      </Button>
    </div>
  );
};

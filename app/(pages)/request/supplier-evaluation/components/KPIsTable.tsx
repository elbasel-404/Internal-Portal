"use client";

import { InputField } from "@components/form";
import { SupplierKPI } from "@types";
import { TableCell } from "@ui";

interface SupplierKPIProps {
  data: SupplierKPI[];
  isForm?: boolean;
}

export const KPIsTable = ({ data, isForm }: SupplierKPIProps) => {
  const tableData = data || [];

  const isDisabledField = (key: string) =>
    key !== "pointsValue" && key !== "notes";

  return (
    <>
      <div>
        <div>
          {tableData.map((kpi: SupplierKPI) => (
            <div key={kpi.id} className={"bg-white flex"}>
              {Object.entries(kpi)
                .filter(([key]) => key !== "id")
                .map(([key, value]) =>
                  !isForm ? (
                    <div key={key} className="w-1/5 px-4 py-7">
                      {typeof value === "string" ? (
                        value
                      ) : (
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          {value.map((item, index) => (
                            <div key={`${kpi.id}-${key}-${index}`}>{item}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <TableCell key={key} className="w-1/12">
                      {typeof value === "string" ? (
                        <InputField
                          label={`${kpi.id}-${key}`}
                          name={`${kpi.id}-${key}`}
                          placeholder=""
                          value={value}
                          disabled={isDisabledField(key)}
                          hideLabel
                        />
                      ) : (
                        <div
                          className="flex flex-col md:flex-row gap-4 items-start"
                          key={`${key}-row`}
                        >
                          {value.map((item, index) => (
                            <InputField
                              label={`${kpi.id}-${key}-${index}`}
                              name={`${kpi.id}-${key}-${index}`}
                              key={`${kpi.id}-${key}-${index}`}
                              placeholder=""
                              value={item}
                              disabled
                              hideLabel
                            />
                          ))}
                        </div>
                      )}
                    </TableCell>
                  )
                )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

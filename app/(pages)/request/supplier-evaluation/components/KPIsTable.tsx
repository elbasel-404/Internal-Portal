"use client";

import { InputField } from "@components/form";
import { SupplierKPI } from "@types";
import { TableBody, TableCell, TableRow, Table as UITable } from "@ui";

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
      <UITable>
        <TableBody>
          {tableData.map((kpi: SupplierKPI) => (
            <TableRow key={kpi.id} className={"bg-white"}>
              {Object.entries(kpi)
                .filter(([key]) => key !== "id")
                .map(([key, value]) =>
                  !isForm ? (
                    <TableCell key={key} className="w-1/12">
                      {typeof value === "string" ? (
                        value
                      ) : (
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          {value.map((item, index) => (
                            <div  key={`${kpi.id}-${key}-${index}`}>{item}</div>
                          ))}
                        </div>
                      )}
                    </TableCell>
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
                        <div className="flex flex-col md:flex-row gap-4 items-start" key={`${key}-row`}>
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
            </TableRow>
          ))}
        </TableBody>
      </UITable>
    </>
  );
};

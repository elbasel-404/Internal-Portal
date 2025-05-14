"use client";
import { SupplierKPI } from "@types";
import { TableBody, TableCell, TableRow, Table as UITable } from "@ui";
import { ChangeEvent, useState } from "react";

interface SupplierKPIProps {
  data: SupplierKPI[];
}

export const KPIsTable = ({ data }: SupplierKPIProps) => {
  const tableData = data || [];

  return (
    <>
      <UITable>
        <TableBody>
          {tableData.map((kpi: SupplierKPI) => (
            <TableRow key={kpi.id} className={"bg-white"}>
              {Object.entries(kpi)
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
    </>
  );
};

"use client";

import { DateField, InputField, SelectField } from "@components/form";
import { useState } from "react";
import { Contracts, Stages } from "../helpers/config";

export const RequestDetailsForm = () => {
  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());

  const handleDatToChange = (value: Date | undefined) => {
    setDateTo(value || new Date());
  };

  const handleDateFromChange = (value: Date | undefined) => {
    setDateFrom(value || new Date());
  };

  return (
    <form>
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="تاريخ الطلب"
            name="requestDate"
            placeholder=""
            required
            disabled
          />
          <InputField
            label="الموظف"
            name="employee"
            placeholder=""
            required
            disabled
          />
          <SelectField
            name="contract"
            label="العقد"
            placeholder=""
            types={Contracts}
          />
          <SelectField
            name="stage"
            label="المرحلة"
            placeholder=""
            types={Stages}
          />
          <DateField
            required
            label="تاريخ من"
            name="date_from"
            date={dateFrom}
            onChange={
              handleDateFromChange as (date: Date | null | undefined) => void
            }
          />
          <DateField
            required
            label="تاريخ الى"
            name="date_to"
            date={dateTo}
            onChange={
              handleDatToChange as (date: Date | null | undefined) => void
            }
          />
          {/* // ToDo: All the following Shouldn't Be displayed unless We select a contract */}
          <InputField
            label="رقم طلب الشراء"
            name="purchaseRequestNumber"
            placeholder=""
            required
            disabled
          />
          <InputField
            label="المورد"
            name="supplier"
            placeholder=""
            required
            disabled
          />
          <InputField
            label="اسم المشروع"
            name="projectName"
            placeholder=""
            required
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="تاريخ بداية العقد"
            name="contractStartDate"
            placeholder=""
            required
            disabled
          />
          <InputField
            label="تاريخ نهاية العقد"
            name="contractEndDate"
            placeholder=""
            required
            disabled
          />
        </div>
      </div>
    </form>
  );
};

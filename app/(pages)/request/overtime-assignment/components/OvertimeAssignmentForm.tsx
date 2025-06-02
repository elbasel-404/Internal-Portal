"use client";

import {
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
  TextareaField,
} from "@components/form";
import { paths } from "@lib";
import { defaultMonths } from "../../config";
import { defaultDays, defaultYears } from "./config";
import { toast } from "sonner";
import { formAction } from "./helpers/formAction";
import { getStateAction } from "./helpers/getStateAction";
import { initialState } from "./helpers/initialState";
import { State } from "./helpers/State";
import { useEffect, useActionState, useState } from "react";

const stateAction = getStateAction<State>(formAction);

export const OvertimeAssignmentForm = () => {
  const [state, action, pending] = useActionState(stateAction, initialState);
  const [form, setForm] = useState({
    year: "",
    month: "",
    day_from: "",
    day_to: "",
    nb_hours: "",
    description: "",
  });

  useEffect(() => {
    const { success, errors } = state;
    if (success) toast.success("تم انشاء الطلب بنجاح");
    if (errors) toast.error(errors);
  }, [state]);

  useEffect(() => {
    if (pending) {
      toast.loading("جاري انشاء الطلب", {
        id: "vacation-form-loading-toast",
      });
    } else {
      toast.dismiss("vacation-form-loading-toast");
    }
  }, [pending]);

  if (state.success) {
    return (
      <div className="bg-white text-black text-lg p-4 space-y-4">
        <p className="text-center">تم انشاء الطلب بنجاح</p>
        <p className="text-center">رقم الطلب: {state.id}</p>
      </div>
    );
  }

  return (
    <form action={action} className="bg-white rounded-md">
      <FormHeader
        label="نموذج طلب تكليف لعمل اضافي"
        path={paths.overtimeAssignment.href}
      />
      <div className="p-4 space-y-6">
        <input
          type="text"
          name="employee_id"
          id="employee_id"
          hidden
          aria-hidden
          readOnly
          value="1722"
          className="hidden"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectField
            label="السنة"
            name="year"
            placeholder=""
            types={defaultYears}
            value={form.year}
            onChange={(value) => setForm({ ...form, year: value })}
          />
          <SelectField
            label="الشهر"
            name="month"
            placeholder=""
            types={defaultMonths}
            value={form.month}
            onChange={(value) => setForm({ ...form, month: value })}
          />
          <SelectField
            label="من يوم"
            name="day_from"
            placeholder=""
            types={defaultDays}
            value={form.day_from}
            onChange={(value) => setForm({ ...form, day_from: value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="إلى يوم"
            name="day_to"
            placeholder=""
            types={defaultDays}
            value={form.day_to}
            onChange={(value) => setForm({ ...form, day_to: value })}
          />
          <InputField
            label="عدد الساعات"
            name="nb_hours"
            placeholder=""
            required
            value={form.nb_hours}
            onChange={(e) => setForm({ ...form, nb_hours: e.target.value })}
          />
        </div>
        <TextareaField
          label="وصف التكليف"
          name="description"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <SubmitButton />
      </div>
    </form>
  );
};

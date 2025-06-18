"use client"

import { FormHeader, InputField, SubmitButton } from "@components/form"
import { paths } from "@lib"
import { useState } from "react"

export const TraineeForm = () => {
  const [form, setForm] = useState({
    employee: "",
    sector: "",
    department: "",
    jobTitle: "",
    traineeName: "",
    idNumber: "",
    trainingTitle: "",
    email: "",
    phone: "",
  })

  return (
    <form className="bg-white rounded-lg text-black text-lg p-4 space-y-4">
      <FormHeader label="بيانات طلب متدرب" path={paths.trainee.href} />
      <div className="py-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="الموظف"
            name="employee"
            disabled
            readOnly
            value={form.employee}
            className="bg-[#BCCADC] hover:bg-[#BCCADC] hover:border-b-[#BCCADC]"
          />
          <InputField
            label="القطاع"
            name="sector"
            disabled
            value={form.sector}
            className="bg-[#BCCADC] hover:bg-[#BCCADC] hover:border-b-[#BCCADC]"
          />
          <InputField
            label="الادارة/القسم"
            name="department"
            disabled
            value={form.department}
            className="bg-[#BCCADC] hover:bg-[#BCCADC] hover:border-b-[#BCCADC]"
          />
          <InputField
            label="المسمي الوظيفي"
            name="jobTitle"
            disabled
            value={form.jobTitle}
            className="bg-[#BCCADC] hover:bg-[#BCCADC] hover:border-b-[#BCCADC]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            required
            label="اسم المتدرب"
            name="traineeName"
            value={form.traineeName}
            onChange={(e) => setForm({ ...form, traineeName: e.target.value })}
          />
          <InputField
            required
            label="رقم الهوية"
            name="idNumber"
            value={form.idNumber}
            onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
          />
          <InputField
            required
            label="المسمي التدريبي"
            name="trainingTitle"
            value={form.trainingTitle}
            onChange={(e) =>
              setForm({ ...form, trainingTitle: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            required
            label="البريد الالكتروني"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <InputField
            required
            label="رقم الجوال"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  )
}

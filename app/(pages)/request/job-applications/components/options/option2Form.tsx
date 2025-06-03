import { InputField, SelectField } from "@components/form"
import {
  departments,
  employeeList,
  jobCategories,
  jobGrades,
  jobTitles,
} from "../config"

export const Option2Form = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <InputField
          label="صاحب الطلب"
          name="applicant"
          placeholder="حمد بن يوسف القشيميط"
          disabled
        />
        <SelectField
          label="اسم الموظف"
          name="employeeName"
          placeholder=""
          types={employeeList}
        />
        <InputField
          label="المسمى الوظيفي"
          name="jobTitle"
          placeholder=""
          disabled
        />
        <InputField
          label="الفئة الوظيفية"
          name="jobCategory"
          placeholder=""
          required
          disabled
        />
        <InputField
          label="الدرجة الوظيفية"
          name="jobGrade"
          placeholder=""
          required
          disabled
        />
        <InputField label="القطاع" name="sector" placeholder="" disabled />
        <InputField
          label="الإدارة العامة"
          name="generalManagement"
          placeholder=""
          disabled
        />
        <InputField
          label="القسم"
          name="department"
          placeholder=""
          required
          disabled
        />
        <InputField label="الإدارة" name="management" placeholder="" disabled />
        <InputField
          label="تاريخ التعيين"
          name="appointmentDate"
          placeholder=""
          required
          disabled
        />
        <InputField
          label="المؤهل العلمي"
          name="academicQualification"
          placeholder=""
          disabled
        />
        <InputField
          label="الرقم الوظيفي"
          name="jobNumber"
          placeholder=""
          disabled
        />
      </div>
      <div className="bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary">
        <h2 className="text-primary font-bold text-xl">المقترح</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <SelectField
          label="المسمى الوظيفي"
          name="jobTitle"
          placeholder=""
          types={jobTitles}
        />
        <SelectField
          label="الفئة الوظيفية"
          name="jobCategory"
          placeholder=""
          types={jobCategories}
        />
        <SelectField
          label="الدرجة الوظيفية"
          name="jobGrade"
          placeholder=""
          types={jobGrades}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField
          label="القسم"
          name="department"
          placeholder=""
          types={departments}
        />
        <InputField label="القطاع" name="sector" placeholder="" disabled />
        <InputField
          label="الإدارة العامة"
          name="generalManagement"
          placeholder=""
          disabled
        />
        <InputField label="الإدارة" name="management" placeholder="" disabled />
      </div>
    </>
  )
}

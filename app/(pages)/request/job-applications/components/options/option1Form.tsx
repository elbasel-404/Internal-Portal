import { InputField, SelectField } from "@components/form"
import { departments, jobTitles } from "../config"

export const Option1Form = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <InputField
        label="صاحب الطلب"
        name="applicant"
        required
        placeholder="حمد بن يوسف القشيميط"
        disabled
      />
      <SelectField
        label="المسمى الوظيفي"
        name="jobTitle"
        placeholder=""
        types={jobTitles}
      />
      <SelectField
        label="القسم"
        name="department"
        placeholder=""
        types={departments}
      />
      <InputField label="الإدارة" name="management" placeholder="" disabled />
      <InputField
        label="الإدارة العامة"
        name="generalManagement"
        placeholder=""
        disabled
      />
      <InputField label="القطاع" name="sector" placeholder="" disabled />
    </div>
  )
}

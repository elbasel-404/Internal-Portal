import { InputField } from "@components/form"

interface FormData {
  first_name_ar: string
  father_name_ar: string
  grandfather_name_ar: string
  family_name_ar: string
  first_name_en: string
  father_name_en: string
  grandfather_name_en: string
  family_name_en: string
  identity: string
}

interface PersonalInfoSectionProps {
  formData: FormData
  requestTypeValue: string
  onInputChange: (name: keyof FormData, value: string) => void
}

export const PersonalInfoSection = ({
  formData,
  requestTypeValue,
  onInputChange,
}: PersonalInfoSectionProps) => {
  const isDisabled = requestTypeValue === "delete"

  return (
    <>
      {/* Arabic Names */}
      <InputField
        label="الاسم الأول"
        name="first_name_ar"
        placeholder=""
        value={formData.first_name_ar}
        onChange={(e) => onInputChange("first_name_ar", e.target.value)}
        required
        disabled={isDisabled}
      />
      <InputField
        label="الاسم الأب"
        name="father_name_ar"
        placeholder=""
        value={formData.father_name_ar}
        onChange={(e) => onInputChange("father_name_ar", e.target.value)}
        required
        disabled={isDisabled}
      />
      <InputField
        label="اسم الجد"
        name="grandfather_name_ar"
        placeholder=""
        value={formData.grandfather_name_ar}
        onChange={(e) => onInputChange("grandfather_name_ar", e.target.value)}
        required
        disabled={isDisabled}
      />
      <InputField
        label="اسم العائلة"
        name="family_name_ar"
        placeholder=""
        value={formData.family_name_ar}
        onChange={(e) => onInputChange("family_name_ar", e.target.value)}
        required
        disabled={isDisabled}
      />

      {/* English Names */}
      <InputField
        label="First Name"
        name="first_name_en"
        placeholder=""
        value={formData.first_name_en}
        onChange={(e) => onInputChange("first_name_en", e.target.value)}
        required
        disabled={isDisabled}
      />
      <InputField
        label="Father's name"
        name="father_name_en"
        placeholder=""
        value={formData.father_name_en}
        onChange={(e) => onInputChange("father_name_en", e.target.value)}
        required
        disabled={isDisabled}
      />
      <InputField
        label="Grandfather's Name"
        name="grandfather_name_en"
        placeholder=""
        value={formData.grandfather_name_en}
        onChange={(e) => onInputChange("grandfather_name_en", e.target.value)}
        required
        disabled={isDisabled}
      />
      <InputField
        label="Family Name"
        name="family_name_en"
        placeholder=""
        value={formData.family_name_en}
        onChange={(e) => onInputChange("family_name_en", e.target.value)}
        required
        disabled={isDisabled}
      />

      {/* Identity */}
      <InputField
        label="رقم الهوية"
        name="identity"
        placeholder=""
        value={formData.identity}
        onChange={(e) => onInputChange("identity", e.target.value)}
        required
        disabled={isDisabled}
      />
    </>
  )
}

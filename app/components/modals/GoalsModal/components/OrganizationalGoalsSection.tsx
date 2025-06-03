import { InputField, SelectField } from "@components/form"

interface OrganizationalGoalsSectionProps {
  formData: {
    organizationalGoalLevel1: string
    strategicGoalLevel2: string
    strategicGoalLevel3: string
  }
  onInputChange: (name: string, value: string) => void
}

export const OrganizationalGoalsSection = ({
  formData,
  onInputChange,
}: OrganizationalGoalsSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <InputField
        label="الهدف المؤسسي المستوى الأول"
        name="organizationalGoalLevel1"
        placeholder="تحقيق التميز المؤسسي"
        value={formData.organizationalGoalLevel1}
        onChange={(e) =>
          onInputChange("organizationalGoalLevel1", e.target.value)
        }
        required
        disabled
      />
      <InputField
        label="الهدف الاستراتيجي المستوى الثاني"
        name="strategicGoalLevel2"
        placeholder="تحقيق التميز المؤسسي (على مستوى قطاع خدمات منشأت)"
        value={formData.strategicGoalLevel2}
        onChange={(e) => onInputChange("strategicGoalLevel2", e.target.value)}
        required
        disabled
      />
      <SelectField
        label="الهدف الاستراتيجي المستوى الثالت"
        name="strategicGoalLevel3"
        types={[{ id: "1", name: "تحقيق التميز المؤسسي" }]}
        placeholder=""
        value={formData.strategicGoalLevel3}
        onChange={(value) => onInputChange("strategicGoalLevel3", value)}
        required
      />
    </div>
  )
}

import { EmployeeMembersField } from "@api/schemas/index"
import { createFileHandler } from "@atoms"
import { FileWithId } from "@types"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { formAction } from "../helpers/formAction"
import { getStateAction } from "../helpers/getStateAction"
import { initialState } from "../helpers/initialState"
import { State } from "../helpers/State"

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

const initialFormData: FormData = {
  first_name_ar: "",
  father_name_ar: "",
  grandfather_name_ar: "",
  family_name_ar: "",
  first_name_en: "",
  father_name_en: "",
  grandfather_name_en: "",
  family_name_en: "",
  identity: "",
}

const stateAction = getStateAction<State>(formAction)

export const useEmployeeMembersForm = (memberField: EmployeeMembersField[]) => {
  const [files, setFiles] = useState<FileWithId[]>([])
  const [state, action, pending] = useActionState(stateAction, initialState)
  const [requestTypeValue, setRequestTypeValue] = useState<string>("")
  const [relationTypeValue, setRelationTypeValue] = useState<string>("")
  const [member, setMember] = useState<string>("")
  const [birthDate, setBirthDate] = useState<Date>(new Date())
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  const handleRequestTypeChange = (value: string) => {
    setRequestTypeValue(value)
  }

  const handleRelationTypeChange = (value: string) => {
    setRelationTypeValue(value)
  }

  const handleMemberChange = (value: string) => {
    setMember(value)

    const selectedMember = memberField.find(
      (member) => member.id.toString() === value,
    )
    if (selectedMember) {
      setFormData({
        first_name_ar: selectedMember.first_name_ar || "",
        father_name_ar: selectedMember.father_name_ar || "",
        grandfather_name_ar: selectedMember.grandfather_name_ar || "",
        family_name_ar: selectedMember.family_name_ar || "",
        first_name_en: selectedMember.first_name_en || "",
        father_name_en: selectedMember.father_name_en || "",
        grandfather_name_en: selectedMember.grandfather_name_en || "",
        family_name_en: selectedMember.family_name_en || "",
        identity: selectedMember.identity || "",
      })

      if (selectedMember.birthday) {
        setBirthDate(new Date(selectedMember.birthday))
      }

      if (selectedMember.relative_relation) {
        setRelationTypeValue(selectedMember.relative_relation)
      }
    }
  }

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (requestTypeValue === "add") {
      setFormData(initialFormData)
      setBirthDate(new Date())
      setRelationTypeValue("")
      setMember("")
    }
  }, [requestTypeValue])

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors)
  }, [state])

  useEffect(() => {
    if (pending) {
      toast.loading("جاري انشاء الطلب", {
        id: "vacation-form-loading-toast",
      })
    } else {
      toast.dismiss("vacation-form-loading-toast")
    }
  }, [pending])

  return {
    // State
    files,
    state,
    pending,
    requestTypeValue,
    relationTypeValue,
    member,
    birthDate,
    formData,

    // Actions
    action,
    fileHandler,
    handleRequestTypeChange,
    handleRelationTypeChange,
    handleMemberChange,
    handleInputChange,
    setBirthDate,
  }
}

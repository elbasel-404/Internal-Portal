"use client"

import {
  AttachmentsField,
  CheckboxField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
} from "@components/form"
import { paths, colors } from "@lib"
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react"
import type { purchase, attachment } from "@types"
import { PdfFileIcon, PrinterIcon } from "@icons"
import { Button } from "@ui"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import { State } from "../../../../lib/createData"

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}
interface ContractorFormProps {
  purchaseList: purchase[]
  attachmentsList: attachment[]
}

export const ContractorForm = ({
  purchaseList,
  attachmentsList,
}: ContractorFormProps) => {
  const [state, setState] = useState<State>(initialState)
  const [isPending, startTransition] = useTransition()

  const [idFiles, setIdFiles] = useState<File[]>([])
  const [aupFiles, setAupFiles] = useState<File[]>([])
  const [ndaFiles, setNdaFiles] = useState<File[]>([])
  const [form, setForm] = useState({
    sh: "",
    projectName: "",
    companyName: "",
    startDate: "",
    endDate: "",
    fullName: "",
    idNumber: "",
    nationality: "",
    jobTitle: "",
    jobIdNumber: "",
    email: "",
    phoneNumber: "",
    approved: false,
  })
  const handleSelectChange = (value: string) => {
    const selectedPurchase = purchaseList.find((p) => p.id.toString() === value)
    if (selectedPurchase) {
      setForm({
        ...form,
        sh: value,
        projectName: selectedPurchase.projectName,
        companyName: selectedPurchase.contractorCompany,
        startDate: selectedPurchase.contractDateStart,
        endDate: selectedPurchase.contractDateEnd,
      })
    }
  }
  const handleFileUpload = (
    setter: Dispatch<SetStateAction<File[]>>,
    files: File[],
  ) => {
    setter((prev) => [...prev, ...files])
  }

  const handleRemoveFile = (
    setter: Dispatch<SetStateAction<File[]>>,
    index: number,
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors?.[0])
  }, [state])

  const action = async (formData: FormData) => {
    toast.loading("جاري انشاء الطلب", {
      id: "overtime-assignment-form-pending",
    })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      toast.dismiss("overtime-assignment-form-pending")
    })
  }

  if (state.success) {
    return (
      <div className="bg-white text-black text-lg p-4 space-y-4">
        <p className="text-center">تم انشاء الطلب بنجاح</p>
        <p className="text-center">رقم الطلب: {state.id}</p>
      </div>
    )
  }

  return (
    <form action={action} className="bg-white rounded-md">
      <FormHeader label="بيانات طلب المتعاقد" path={paths.contractor.href} />
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <SelectField
            name="purchase_request_id"
            value={form.sh}
            label="طلب الشراء (المشروع)"
            placeholder="__"
            types={purchaseList.map(({ id, name }) => ({ id, name }))}
            onChange={handleSelectChange}
            required
          />
          <InputField
            name="project_name"
            value={form.projectName}
            label="اسم المشروع"
            placeholder=""
            disabled
            required
          />
          <InputField
            name="contractor_company"
            value={form.companyName}
            label="الشركة المشغلة"
            placeholder=""
            disabled
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            name="contract_date_start"
            value={form.startDate}
            label="تاريخ بداية العقد"
            placeholder=""
            disabled
            required
          />
          <InputField
            name="contract_date_end"
            value={form.endDate}
            label="تاريخ نهاية العقد"
            placeholder=""
            disabled
            required
          />
          <InputField
            name="contractor_name"
            label="الأسم"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.currentTarget.value })
            }
            placeholder=""
            required
          />
          <InputField
            name="id_number"
            value={form.idNumber}
            onChange={(e) =>
              setForm({ ...form, idNumber: e.currentTarget.value })
            }
            label="رقم الهوية/الأقامة"
            placeholder=""
            required
          />
          <InputField
            name="nationality"
            value={form.nationality}
            onChange={(e) =>
              setForm({ ...form, nationality: e.currentTarget.value })
            }
            label="الجنسية"
            placeholder=""
            required
          />
          <InputField
            name="job_title"
            value={form.jobTitle}
            onChange={(e) =>
              setForm({ ...form, jobTitle: e.currentTarget.value })
            }
            label="المسمي الوظيفي فى الشركة"
            placeholder=""
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
          <InputField
            name="employee_number"
            value={form.jobIdNumber}
            onChange={(e) =>
              setForm({ ...form, jobIdNumber: e.currentTarget.value })
            }
            label="الرقم الوظيفي فى الشركة"
            placeholder=""
            required
          />
          <InputField
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
            label="البريد الالكتروني"
            placeholder=""
            required
          />
          <InputField
            name="mobile"
            value={form.phoneNumber}
            onChange={(e) =>
              setForm({ ...form, phoneNumber: e.currentTarget.value })
            }
            label="رقم الجوال"
            placeholder=""
            required
          />
        </div>
        <div className="space-y-2">
          <AttachmentsField
            label="الهوية/الأقامة/الجواز"
            name="identity_attachment_ids"
            required
            files={idFiles}
            handleFileUpload={(fileList) =>
              fileList && handleFileUpload(setIdFiles, Array.from(fileList))
            }
            handleRemoveFile={(index) => handleRemoveFile(setIdFiles, index)}
          />
          {attachmentsList[0].identity &&
            downloadAttachment(
              attachmentsList[0].identity,
              "الهوية/الأقامة/الجواز",
            )}
          <AttachmentsField
            label="نموذج الأستخدام المقبول"
            name="acceptable_use_attachment_ids"
            required
            files={aupFiles}
            handleFileUpload={(fileList) =>
              fileList && handleFileUpload(setAupFiles, Array.from(fileList))
            }
            handleRemoveFile={(index) => handleRemoveFile(setAupFiles, index)}
          />
          {attachmentsList[0].acceptableUse &&
            downloadAttachment(
              attachmentsList[0].acceptableUse,
              "نموذج الأستخدام المقبول",
            )}
          <AttachmentsField
            label="نموذج سياسة عدم الأفصاح"
            name="nondisclosure_attachment_ids"
            required
            files={ndaFiles}
            handleFileUpload={(fileList) =>
              fileList && handleFileUpload(setNdaFiles, Array.from(fileList))
            }
            handleRemoveFile={(index) => handleRemoveFile(setNdaFiles, index)}
          />
          {attachmentsList[0].nonDisclosure &&
            downloadAttachment(
              attachmentsList[0].nonDisclosure,
              "نموذج سياسة عدم الأفصاح",
            )}
        </div>
        <CheckboxField
          name="confirm_information"
          checked={form.approved}
          onChange={() => setForm({ ...form, approved: !form.approved })}
          label="اقر بأن المعلومات صحيحة"
          className="flex items-center gap-x-3"
          labelStyle="text-lg text-black"
          checkboxStyle="-order-1 border-black"
          required
        />
        <SubmitButton disabled={isPending} loading={isPending} />
      </div>
    </form>
  )
}
const downloadAttachment = (url: string, fileName: string) => {
  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-[#EEF2F6] rounded-md">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex bg-[#FFF4CF] items-center rounded-md justify-center group-hover:bg-[#FFE8A3] transition-colors">
          <PdfFileIcon className="w-4 h-4 text-amber-600" />
        </div>
        <p>{fileName}</p>
      </div>
      <a
        href={url + "true"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button
          className="bg-primary-opacity hover:bg-primary/20 rounded-md w-8 h-8 p-0 transition-all duration-200 hover:scale-105"
          title="Download file"
          type="button"
        >
          <PrinterIcon
            className="w-3.5 h-3.5"
            width={14}
            height={14}
            fill={colors.light.primary}
          />
        </Button>
      </a>
    </div>
  )
}

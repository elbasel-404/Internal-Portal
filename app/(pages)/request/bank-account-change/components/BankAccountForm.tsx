"use client"

import { BankDetail } from "@api/schemas/bank-details/schema"
import { createFileHandler } from "@atoms"
import {
  AttachmentsField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
} from "@components/form"
import { paths } from "@lib"
import { FileWithId } from "@types"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import { State } from "../../../../lib/createData"

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}

interface BankAccountFormProps {
  bankDetails: BankDetail[]
}

export const BankAccountForm = ({ bankDetails }: BankAccountFormProps) => {
  const [state, setState] = useState<State>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pending = isPending || isSubmitting
  const [files, setFiles] = useState<FileWithId[]>([])
  const [iban, setIban] = useState("")
  const [bankId, setBankId] = useState("")

  const handleIbanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIban(event.target.value)
  }

  const handleBankIdChange = (value: string) => {
    setBankId(value)
  }

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors?.[0])
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", { id: "bank-account-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
      toast.dismiss("bank-account-form-pending")
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
    <form
      action={action}
      className="bg-white rounded-lg text-black text-lg p-4 space-y-4"
    >
      <FormHeader
        label="نموذج طلب تغيير الحساب البنكي"
        path={paths.bankAccountChange.href}
      />
      <div className="p-4 space-y-6">
        {/* TODO not integerated */}
        <InputField
          label="الحساب الحالي للموظف"
          name="bankAccount"
          placeholder="مصرف الراجحي - SA2880000387608010079237"
          disabled
        />
        <SelectField
          name="new_bank_id"
          label="اسم البنك الجديد"
          placeholder="__"
          types={bankDetails.map((bank) => ({ id: bank.id, name: bank.name }))}
          onChange={handleBankIdChange}
          value={bankId}
          required
        />
        <InputField
          label="رقم الحساب الجديد IBAN"
          name="iban"
          placeholder="SA__________________"
          value={iban}
          onChange={handleIbanChange}
          required
        />
        <AttachmentsField
          files={files}
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
          errors={
            state.errors?.filter((error) =>
              error.toLowerCase().includes("attachment"),
            ) || []
          }
          required
        />
        <SubmitButton disabled={pending} loading={pending} />
      </div>
    </form>
  )
}

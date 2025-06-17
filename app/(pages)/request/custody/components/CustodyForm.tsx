"use client"

import {
  CheckboxField,
  FormHeader,
  InputField,
  RadioField,
  SubmitButton,
  TextareaField,
} from "@components/form"
import { paths } from "@lib"
import { ChangeEvent, useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import { getStateAction } from "./helpers/getStateAction"
import { initialState } from "./helpers/initialState"
import { State } from "./helpers/State"

const stateAction = getStateAction<State>(formAction)

export const CustodyForm = () => {
  const [state, action, pending] = useActionState(stateAction, initialState)
  const [custodyType, setCustodyType] = useState<string>("temporary")
  const [custodyAmount, setCustodyAmount] = useState("")
  const [custodyReason, setCustodyReason] = useState("")

  const handleCustodyTypeChange = (value: string) => {
    setCustodyType(value)
  }

  const handleCustodyAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustodyAmount(event.target.value)
  }

  const handleCustodyReasonChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCustodyReason(event.target.value)
  }

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors)
  }, [state])

  useEffect(() => {
    if (pending) {
      toast.loading("جاري انشاء الطلب", {
        id: "permission-form-loading-toast",
      })
    } else {
      toast.dismiss("permission-form-loading-toast")
    }
  }, [pending])

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
      <FormHeader label="نموذج طلب عهدة" path={paths.custody.href} />
      {/* <input
        type="text"
        name="employee_id"
        id="employee_id"
        hidden
        aria-hidden
        readOnly
        value="21"
        className="hidden"
      /> */}
      <div className="space-y-4">
        <RadioField
          label="نوع العهدة"
          name="custody_type"
          options={[
            { value: "temporary", label: "عهدة مؤقتة" },
            { value: "permanent", label: "عهدة دائمة" },
          ]}
          required={true}
          labelStyle="font-medium text-base"
          radioStyle="flex-col md:flex-row"
          className="flex-col md:flex-row md:items-center"
          selectedValue={custodyType}
          onChange={handleCustodyTypeChange}
        />

        <InputField
          name="custody_amount"
          label="مبلغ العهدة"
          value={custodyAmount}
          onChange={handleCustodyAmountChange}
          placeholder=""
          required
        />
        <TextareaField
          required
          name="custody_reason"
          label="الغرض من العهدة"
          value={custodyReason}
          onChange={handleCustodyReasonChange}
          placeholder=""
        />

        <h2 className="text-foreground font-bold text-lg">التعليمات</h2>
        <div className="space-y-2 bg-cloudGray rounded-md p-4">
          <ul className="list-inside pl-6 text-grey-600">
            <li>-مبلغ الاستعاضة يجب ألا يتجاوز مبلغ العهدة.</li>
            <li>
              -لا تصرف عهدة جديدة في حالة وجود رصيد لعهدة سابقة لم يتم تصفيتها.
            </li>
            <li>
              -يجب تسديد أو إقفال جميع العهد بعد انتهاء الغرض منها بحد أقصى شهر
              من تاريخ انتهى الغرض منها أو قبل شهر من نهاية السنة المالية أيهما
              أقرب.
            </li>
            <li>
              -الزمن المتوقع لإتمام صرف العهدة هو خمسة أيام من تاريخ استلام
              الطلب مكتمل.
            </li>
            <li>-البيانات الواردة في نموذج العهدة من مسؤولية الجهة الطالبة.</li>
            <li>
              -يتم الصرف من العهدة بفواتير صادرة باسم الهيئة مؤرخة، خالية من
              الشطب والتعديل، مستكملة لجميع الحقول ومعتمدة من المدير المباشر
              لصاحب الطلب.
            </li>
            <li>
              -في حالة تجاوز مبلغ الفاتورة ثلاثة آلاف ريال، فلابد من وجود موافقة
              مسبقة من صاحب الصلاحية مع إرفاق ثلاثة عروض للأسعار.
            </li>
            <li>
              -يلزم عمل نسخة مصورة بصيغة PDF لجميع الفواتير الأصل وإرفاقها مع
              طلب الاستعاضة أو الإغلاق، وتسليمها حسب النموذج المطبق بالتنسيق مع
              المالية.
            </li>
          </ul>
          <CheckboxField
            name="approved"
            label="أقر أنا المتقدم/ة بأني قرأت واطلعت على الشروط والتعليمات المذكورة أعلاه."
            className="flex items-center gap-x-3"
            labelStyle="text-lg text-black"
            checkboxStyle="-order-1 border-black"
            required
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  )
}

"use client"

import { Table } from "@components"
import {
  CheckboxField,
  DateField,
  FormHeader,
  InputField,
  RadioField,
  SelectField,
  SubmitButton,
} from "@components/form"
import { ModalLink } from "@components/modals/ModalLink"
import { CirclePlusIcon } from "@icons"
import { paths } from "@lib"
import { CovenantSchema } from "@zodSchemas"
import { useState } from "react"
import { z } from "zod"

const covenantNumberList = [
  { id: 1, name: "125" },
  { id: 2, name: "820" },
  { id: 3, name: "774" },
  { id: 4, name: "455" },
  { id: 5, name: "155" },
]

const tableHeaders = [
  { label: "المنتج" },
  { label: "البيان" },
  { label: "المبلغ" },
  { label: "رقم الفاتورة" },
  { label: "المرفقات" },
]

type Data = z.infer<typeof CovenantSchema>
interface ReplacementCovenantFormProps {
  data: Data[]
}
export const ReplacementCovenantForm = ({
  data,
}: ReplacementCovenantFormProps) => {
  const [covenantType, setCovenantType] = useState<string>("closing")

  const handleCovenantTypeChange = (value: string) => {
    setCovenantType(value)
  }

  const convertedCovenantDetailsData = data.map((covenantDetails, index) => ({
    ...covenantDetails,
    id: index + "id",
  }))

  return (
    <form className="bg-white rounded-md">
      <FormHeader
        label="نموذج طلب استعاضة وإقفال عهدة"
        path={paths.replacementCovenant.href}
      />
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            name="covenantNumber"
            label="رقم العهدة"
            placeholder="__"
            types={covenantNumberList}
          />
          <InputField
            name="date"
            label="تاريخ العهدة"
            placeholder=""
            disabled
          />
        </div>
        <RadioField
          label="نوع استعاضة/إقفال العهدة"
          name="covenantType"
          options={[
            { value: "closing", label: "إقفال" },
            { value: "replacement", label: "استعاضة" },
          ]}
          required={true}
          labelStyle="font-medium text-base"
          radioStyle="flex-col md:flex-row"
          className="flex-col md:flex-row md:items-center"
          selectedValue={covenantType}
          onChange={handleCovenantTypeChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            name="covenantPurpose"
            label="الغرض من العهدة"
            placeholder=""
            disabled
          />
          <InputField
            name="covenantCategory"
            label="نوع العهدة"
            placeholder=""
            disabled
          />
          <InputField
            name="covenantAmount"
            label="مبلغ العهدة"
            placeholder=""
            disabled
          />
          <DateField
            name="covenantDate"
            label="تاريخ استعاضة/إقفال العهدة"
            required={true}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary">
          <h2 className="text-primary font-bold text-xl">
            تفاصيل استعاضة/إقفال عهدة
          </h2>
          <ModalLink
            name="CovenantDetailsModal"
            className="flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
          >
            <CirclePlusIcon className="fill-white group-hover:fill-primary" />
            أضف جديد
          </ModalLink>
        </div>
        <Table
          tableClassName="h-fit"
          columns={tableHeaders}
          rows={convertedCovenantDetailsData}
          toggleId={false}
        />
        <InputField
          name="covenantAmount"
          label="إجمالي مبلغ استعاضة/اقفال عهدة"
          placeholder=""
          required
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

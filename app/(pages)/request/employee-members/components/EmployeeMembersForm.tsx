"use client"

import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
} from "@components/form"
import { paths } from "@lib"
import { useState } from "react"
// import { RequestTypes, members, relations } from './config';
import { createFileHandler } from "@atoms"
import { FileWithId } from "@types"
import { RequestTypes, relations } from "./config"

export const EmployeeMembersForm = () => {
  const [files, setFiles] = useState<FileWithId[]>([])
  // const [requestTypeValue, setRequestTypeValue] = useState<string>('');
  // const [relationTypeValue, setRelationTypeValue] = useState<string>('');
  // const [member, setMember] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date>(new Date())

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  // const handleRequestTypeChange = (value: string) => {
  //   setRequestTypeValue(value);
  // };

  // const handleRelationTypeChange = (value: string) => {
  //   setRelationTypeValue(value);
  // };

  // const handleMemberChange = (value: string) => {
  //   setMember(value);
  // };

  // console.log(relationTypeValue);

  return (
    <form className="bg-white rounded-md">
      <FormHeader
        label="نموذج طلب تحديث أفراد الأسرة"
        path={paths.employeeMembers.href}
      />
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectField
            name="requestType"
            label="نوع الطلب"
            types={RequestTypes}
            // value={requestTypeValue}
            // onChange={handleRequestTypeChange}
          />
          {/* {requestTypeValue !== '1'  && (
              <SelectField
                name='member'
                label='اختيار الفرد'
                types={members}
                // value={member}
                placeholder='__'
                // onChange={handleMemberChange}
              />
            )} */}
          <InputField
            label="الاسم الأول"
            name="firstName"
            placeholder=""
            required
            // disabled={requestTypeValue === '3'}
          />
          <InputField
            label="الاسم الأب"
            name="parentName"
            placeholder=""
            required
            // disabled={requestTypeValue === '3'}
          />
          <InputField
            label="اسم الجد"
            name="grandFatherName"
            placeholder=""
            required
            // disabled={requestTypeValue === '3'}
          />
          <InputField
            label="اسم العائلة"
            name="familyName"
            placeholder=""
            required
            // disabled={requestTypeValue === '3'}
          />
          <InputField
            label="First Name"
            name="firstName"
            placeholder=""
            required
            // disabled={requestTypeValue === '3'}
          />
          <InputField
            label="Father's name"
            name="parentName"
            placeholder=""
            required
            // disabled={requestTypeValue === '3'}
          />
          <InputField
            label="Grandfather's Name"
            name="grandFatherName"
            placeholder=""
            required
            // disabled={requestTypeValue === '3'}
          />
          <InputField
            label="Family Name"
            name="familyName"
            placeholder=""
            required
            // disabled={requestTypeValue === '3'}
          />
          <InputField
            label="رقم الهوية"
            name="idNumber"
            placeholder=""
            required
            // disabled={requestTypeValue === '3'}
          />
          <DateField
            date={birthDate}
            onChange={(value) => setBirthDate(value || new Date())}
            label="تاريخ الميلاد"
            name="birthDate"
            required
          />
          <SelectField
            name="relationType"
            label="صلة القرابة"
            types={relations}
            // value={relationTypeValue}
            placeholder=""
            // onChange={handleRelationTypeChange}
          />
        </div>

        <AttachmentsField
          files={files}
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
        />

        <SubmitButton />
      </div>
    </form>
  )
}

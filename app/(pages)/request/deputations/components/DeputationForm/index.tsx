"use client";

import { paths } from "@lib";
import { useState } from "react";
import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
  TextareaField,
  RadioField,
} from "@components/form";
import {
  TransportationTypes,
  RequestTypes,
  DeputationsTypes,
  TrainingRequests,
  Cities,
  Tasks,
  ReplacementEmployees,
  DeputationPlaces,
} from "../config";
import { PlacesTable } from "./PlacesTable";

export const DeputationForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [requestType, setRequestType] = useState<string>("external");
  const [requestTypeCaption, setRequestTypeCaption] = useState<string>("خارج");
  const [transportationType, setTransportationType] = useState<string>("ByAir");
  const [showKilometers, setShowKilometers] = useState<boolean>(false);
  const [deputationType, setDeputationType] = useState<string>("task");
  const [showTrainingRequestNumber, setTrainingRequestNumber] =
    useState<boolean>(false);
  const [deputationStartDate, setDeputationStartDate] = useState(new Date());
  const [deputationEndDate, setDeputationEndDate] = useState(new Date());
  const [duration, setDeputationDuration] = useState<number>(0);
  const [isInternal, setIsInternal] = useState<boolean>(false);
  const [issueVisa, setIssueVisa] = useState<boolean>(false);
  const [places, updatePlaces] = useState<
    {
      id: string;
      name: string;
      city: string;
    }[]
  >(DeputationPlaces);

  const handleRequestTypeChange = (value: string) => {
    setRequestType(value);
    setRequestTypeCaption(value === "internal" ? "داخل" : "خارج");
    setIsInternal(value === "internal");
  };

  const handleTransportationTypeChange = (value: string) => {
    setTransportationType(value);
    setShowKilometers(value === "Overland");
  };

  const handleDeputationTypeChange = (value: string) => {
    setDeputationType(value);
    setTrainingRequestNumber(value === "training");
  };

  const handleDeputationStartDateChange = (value: Date | undefined) => {
    setDeputationStartDate(value || new Date());
  };

  const handleDeputationEndDateChange = (value: Date | undefined) => {
    setDeputationEndDate(value || new Date());
    // Calculate the difference in days between the two dates
    const startDate = new Date(deputationStartDate);
    if (value) {
      const endDate = new Date(value);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDeputationDuration(diffDays);
    } else {
      setDeputationDuration(0);
    }
  };

  const handleRemovePlace = (id: string) => {
    const updatedPlaces = places.filter((place) => place.id !== id);
    updatePlaces(updatedPlaces);
  };
  const handleAddPlace = (newPlace: { id: string; name: string; city: string }) => {
    const updatedPlaces = [...places, newPlace];
    updatePlaces(updatedPlaces);
  };

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(
        (file) => new File([file], file.name)
      );
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <form className="bg-white rounded-md">
      <FormHeader label="نموذج طلب انتداب" path={paths.workDocument.href} />
      <div className="p-4 space-y-6">
        <div className="gird grid-cols-12 space-y-4">
          <RadioField
            label="انتداب"
            name="requestType"
            options={RequestTypes}
            labelStyle="text-base"
            selectedValue={requestType}
            required
            onChange={handleRequestTypeChange}
          />
          <div className={`bg-primary-opacity py-4 px-4 rounded-lg`}>
            <p className={`text-primary font-medium`}>
              {requestTypeCaption} المملكة العربية السعودية
            </p>
          </div>

          <RadioField
            label="وسيلة النقل"
            name="requestType"
            options={TransportationTypes}
            labelStyle="text-base"
            selectedValue={transportationType}
            required
            onChange={handleTransportationTypeChange}
          />
          {showKilometers && (
            <InputField
              label="عدد الكليلومترات"
              name="kilometers"
              placeholder=""
              required={showKilometers}
            />
          )}
          <SelectField
            name="deputationType"
            label="نوع الانتداب"
            placeholder="__"
            types={DeputationsTypes}
            value={deputationType}
            onChange={handleDeputationTypeChange}
          />

          {showTrainingRequestNumber && (
            <SelectField
              name="trainingRequestNumber"
              label="رقم طلب التدريب"
              placeholder="__"
              types={TrainingRequests}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DateField
            required
            label="تاريخ بداية الانتداب"
            name="deputationStartDate"
            date={deputationStartDate}
            onChange={
              handleDeputationStartDateChange as (
                date: Date | null | undefined
              ) => void
            }
          />
          <DateField
            required
            name="date_from"
            label="تاريخ نهاية الانتداب"
            date={deputationEndDate}
            onChange={
              handleDeputationEndDateChange as (
                date: Date | null | undefined
              ) => void
            }
          />
          <InputField
            label="المدة بالأيام"
            name="documentAddress"
            placeholder=""
            value={duration}
            required
            disabled
          />
        </div>
        <div className="gird grid-cols-12 space-y-4">
          {isInternal ? (
            <SelectField
              name="city"
              label="المدينة"
              placeholder="__"
              types={Cities}
              required={isInternal}
            />
          ) : (
            <PlacesTable
              data={places}
              issueVisa={issueVisa}
              onChangeIssueVisa={(value) => setIssueVisa(value)}
              onRemove={(id) => handleRemovePlace(id)}
              onAdd={() =>handleAddPlace ({ id: "", name: "", city: "" })} // Add a new place
            />
          )}

          <SelectField
            name="task"
            label="المهمة"
            placeholder="__"
            types={Tasks}
          />
          <TextareaField label="تفاصيل المهمة" name="taskDetails" required />

          {!isInternal && (
            <SelectField
              name="replacementEmployee"
              label="الموظف البديل "
              placeholder="__"
              types={ReplacementEmployees}
              required={!isInternal}
            />
          )}
        </div>

        <AttachmentsField
          label="المرفقات"
          files={files}
          handleFileUpload={handleFileUpload}
          handleRemoveFile={handleRemoveFile}
          required
        />

        <SubmitButton />
      </div>
    </form>
  );
};

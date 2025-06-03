import { Table } from "@components"
import { CheckboxField } from "@components/form"
import { ModalLink } from "@components/modals/ModalLink"
import { CirclePlusIcon } from "@icons"
import { removeTrainingCourse } from "@server"
import { ExtendedTrainingSectionProps } from "../FormTypes/types"

const tableHeaders = [
  { label: "تاريخ الدورة (من والى)" },
  { label: "المدة باليوم" },
  { label: "أيام السفر" },
  { label: "إعدادات تواريخ السفر" },
  { label: "الإجراءات" },
]

export const ExtendedTrainingSection = ({
  extendedTraining,
  setExtendedTraining,
  trainingCourses,
}: ExtendedTrainingSectionProps) => {
  const trainingCoursesData = trainingCourses.map((trainingCourse, index) => ({
    trainingdate: trainingCourse.dateFrom + " / " + trainingCourse.dateTo,
    duration: "1",
    travelDays: "1",
    travelDateSettings: trainingCourse.travelDateSettings,
    id: index + "id",
  }))

  const handleRemoveTrainingCourse = async (id: number) => {
    await removeTrainingCourse(id)
  }
  return (
    <>
      <CheckboxField
        label="تدريب ممتد"
        name="extendedTraining"
        required={false}
        checked={extendedTraining}
        onChange={(value) => setExtendedTraining(value)}
        className="flex md:items-center gap-x-3"
        labelStyle="text-foreground font-medium leading-0"
        checkboxStyle="-order-1 mt-1 md:mt-0"
      />

      {extendedTraining && (
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary">
          <h2 className="text-darkBlue font-bold text-xl">
            تقسيم الدورات التدريبية <span className="text-red-500">*</span>
          </h2>
          <ModalLink
            name="TrainingCoursesModal"
            className="flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
          >
            <CirclePlusIcon className="fill-white group-hover:fill-primary" />
            إضافة عنصر
          </ModalLink>
        </div>
      )}

      {trainingCoursesData.length > 0 && (
        <Table
          tableClassName="h-fit"
          columns={tableHeaders}
          rows={trainingCoursesData}
          toggleId={false}
          toggleDelete
          onRemove={handleRemoveTrainingCourse}
        />
      )}
    </>
  )
}

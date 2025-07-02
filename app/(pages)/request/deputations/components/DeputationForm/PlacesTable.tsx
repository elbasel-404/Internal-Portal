"use client"

import { Table } from "@components"
import { CheckboxField } from "@components/form"
import { ModalLink } from "@components/modals/ModalLink"
import { CirclePlusIcon } from "@icons"
import { removeDeputationLocation } from "@server"

interface DeputationPlacesProps {
  //TODO: DeputationPlace Type
  data: { country_id: string; city_name: string }[]
  issueVisa: boolean
  onChangeIssueVisa: (value: boolean) => void
  onRemove?: (id: string) => void
  onAdd?: () => void
}

const tableHeaders = [
  { label: "البلاد" },
  { label: "المدينة" },
  { label: "الاجراءات" },
]

export const PlacesTable = ({
  data,
  issueVisa,
  onChangeIssueVisa,
}: DeputationPlacesProps) => {
  // Removed unused function
  // function changeIssueVisa(value: boolean): void {}

  const deputationLocationData = data.map((location, index) => ({
    id: index + "id",
    countryId: location.country_id,
    cityName: location.city_name,
  }))

  const handleRemoveDeputationLocation = async (id: number) => {
    await removeDeputationLocation(id)
  }

  return (
    <>
      <div className="bg-white rounded-lg m-6">
        <div className="flex border-r-4 items-center bg-[#007C9E24] border-[#007497] py-3 px-2 mb-2">
          <div className="flex gap-2 slotHandle p-4 flex-1">
            <h2 className="text-2xl font-bold">
              مكان الانتداب <span className="text-red-500">*</span>
            </h2>
          </div>
          <div>
            <ModalLink
              name="DeputationPlacesModal"
              className="flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
            >
              <CirclePlusIcon className="fill-white group-hover:fill-primary" />
              اضافة مكان الانتداب
            </ModalLink>
          </div>
        </div>

        <input
          name="location_ids"
          hidden
          aria-hidden
          className="hidden"
          value={JSON.stringify(
            data.map((location) => ({
              country_id: location.country_id,
              city_name: location.city_name,
            })),
          )}
        />

        {data.length > 0 && (
          <Table
            tableClassName="h-fit"
            columns={tableHeaders}
            rows={deputationLocationData}
            toggleId={false}
            toggleDelete
            onRemove={handleRemoveDeputationLocation}
          />
        )}
        <div className="my-10">
          <CheckboxField
            name="issueVisa"
            label="ارغب في اصدار تأشيرة سفر من قبل منشآت  "
            className="flex md:items-center gap-x-3"
            labelStyle="text-lg text-black font-medium leading-0"
            checkboxStyle="mt-1 md:mt-0"
            checked={issueVisa}
            onChange={(value) => onChangeIssueVisa(value)}
          />
        </div>
      </div>
    </>
  )
}

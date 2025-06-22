import { InputField, SelectField } from "@components/form"
import { TrainingLocationSectionProps } from "../FormTypes/types"

export const TrainingLocationSection = ({
  trainingCity,
  setTrainingCity,
  trainingCityId,
  setTrainingCityId,
  trainingCountry,
  setTrainingCountry,
  travelDays,
  trainingAssignment,
  setTrainingAssignment,
  trainingMethod,
  handleTravelDaysChangeValue,
  trainingCitiesField,
  trainingCountriesField,
  trainingTravelDaysSettingsFields,
  extendedTraining,
}: TrainingLocationSectionProps) => (
  <div className="space-y-6">
    {trainingMethod === "international" && (
      <SelectField
        label="الدولة"
        name="country_id"
        placeholder="___"
        types={trainingCountriesField.map(({ id, name }) => ({
          id: id ?? "",
          name: name ?? "",
        }))}
        value={trainingCountry}
        onChange={(value) => setTrainingCountry(value)}
      />
    )}

    {(trainingMethod === "local" || trainingMethod === "international") && (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          trainingMethod !== "international"
            ? "md:grid-cols-3"
            : "md:grid-cols-2"
        } gap-3`}
      >
        {trainingMethod === "local" && (
          <SelectField
            label="المدينة"
            name="city_id"
            placeholder="___"
            types={trainingCitiesField.map(({ id, name }) => ({
              id: id ?? "",
              name: name ?? "",
            }))}
            value={trainingCityId}
            onChange={(value) => setTrainingCityId(value)}
          />
        )}
        {trainingMethod === "international" && (
          <InputField
            label="المدينة"
            name="city"
            value={trainingCity}
            onChange={(e) => setTrainingCity(e.target.value)}
            required
          />
        )}
        {!extendedTraining && (
          <InputField
            label="ايام السفر"
            name="travel_days"
            value={travelDays}
            onChange={handleTravelDaysChangeValue}
            required
            disabled
          />
        )}

        {trainingMethod !== "international" && !extendedTraining && (
          <SelectField
            label="بداية انتداب التدريب"
            name="travel_days_settings"
            placeholder="___"
            types={trainingTravelDaysSettingsFields.map(({ id, name }) => ({
              id: id ?? "",
              name: name ?? "",
            }))}
            value={trainingAssignment}
            onChange={(value) => setTrainingAssignment(value)}
          />
        )}
      </div>
    )}
  </div>
)

import { InputField, SelectField } from "@components/form"
import {
  TrainingAssignment,
  TrainingCities,
  TrainingCountries,
} from "../config"
import { TrainingLocationSectionProps } from "../FormTypes/types"

export const TrainingLocationSection = ({
  trainingCity,
  setTrainingCity,
  trainingCountry,
  setTrainingCountry,
  travelDays,
  trainingAssignment,
  setTrainingAssignment,
  trainingMethod,
  handleTravelDaysChangeValue,
}: TrainingLocationSectionProps) => (
  <div className="space-y-6">
    {trainingMethod === "international" && (
      <SelectField
        label="الدولة"
        name="country"
        placeholder="___"
        types={TrainingCountries}
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
        <SelectField
          label="المدينة"
          name="city"
          placeholder="___"
          types={TrainingCities}
          value={trainingCity}
          onChange={(value) => setTrainingCity(value)}
        />
        <InputField
          label="ايام السفر"
          name="travelDays"
          value={travelDays}
          onChange={handleTravelDaysChangeValue}
          required
          disabled
        />
        {trainingMethod !== "international" && (
          <SelectField
            label="بداية انتداب التدريب"
            name="trainingAssignment"
            placeholder="___"
            types={TrainingAssignment}
            value={trainingAssignment}
            onChange={(value) => setTrainingAssignment(value)}
          />
        )}
      </div>
    )}
  </div>
)

import { SelectField } from "@components/form"
import {
  reportClassificationTypes,
  secondSubcategoryTypes,
  subcategoryTypes,
  thirdSubcategoryTypes,
} from "./config"

export const TechnicalReport = () => {
  return (
    <>
      <SelectField
        name="classification"
        label="التصنيف"
        placeholder=""
        types={reportClassificationTypes}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <SelectField
          name="subcategory"
          label="التصنيف الفرعي"
          placeholder=""
          types={subcategoryTypes}
        />
        <SelectField
          name="secondSubcategory"
          label="التصنيف الفرعي الثاني"
          placeholder=""
          types={secondSubcategoryTypes}
        />
        <SelectField
          name="thirdSubcategory"
          label="التصنيف الفرعي الثالث"
          placeholder=""
          types={thirdSubcategoryTypes}
        />
      </div>
    </>
  )
}

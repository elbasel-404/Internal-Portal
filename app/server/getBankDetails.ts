import {
  BankDetailSchema,
  type BankDetail,
} from "@api/schemas/bank-details/schema"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getData } from "./getData"
// Removed unused import: import { da } from "date-fns/locale"

export const getBankDetails = async (): Promise<BankDetail[]> => {
  return getData<BankDetail>({
    url: "api/po/hr/new-bank",
    responseSchema: ResponseSchema,
    dataSchema: BankDetailSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: typedItem.id,
          name: typedItem.name,
          display_name: typedItem.display_name,
          street: typedItem.street,
          street2: typedItem.street2,
          zip: typedItem.zip,
          city: typedItem.city,
          state: typedItem.state,
          country: typedItem.country,
          email: typedItem.email,
          phone: typedItem.phone,
          active: typedItem.active,
          bic: typedItem.bic,
          create_uid: typedItem.create_uid,
          write_date: typedItem.write_date,
          __last_update: typedItem.__last_update,
          create_date: typedItem.create_date,
          write_uid: typedItem.write_uid,
        }
      })
    },
    dummyData: dummyData,
  })
}

const dummyData: BankDetail[] = [
  {
    id: 1,
    name: "Dummy Bank 1",
    street: false,
    street2: false,
    zip: false,
    city: false,
    state: false,
    country: false,
    email: false,
    phone: false,
    active: true,
    bic: false,
    create_uid: [1, "admin"],
    create_date: new Date("2023-01-01"),
    write_uid: [2, "editor"],
    write_date: new Date("2023-01-02"),
    display_name: "Dummy Bank 1 - DUMMY1",
    __last_update: new Date("2023-01-03"),
  },
  {
    id: 2,
    name: "Dummy Bank 2",
    street: false,
    street2: false,
    zip: false,
    city: "Sample City",
    state: false,
    country: [1, "CountryName"],
    email: false,
    phone: false,
    active: true,
    bic: "DUMMYBIC",
    create_uid: [3, "creator"],
    create_date: new Date("2023-02-01"),
    write_uid: [4, "updater"],
    write_date: new Date("2023-02-02"),
    display_name: "Dummy Bank 2 - DUMMY2",
    __last_update: new Date("2023-02-03"),
  },
]

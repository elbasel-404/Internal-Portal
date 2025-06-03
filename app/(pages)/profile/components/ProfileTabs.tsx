import { AddressBookIcon, PenLineIcon, UserWithFolderIcon } from "@icons"

export const profileTabs = [
  {
    name: "بياناتي الشخصية",
    filter: "personalData",
    icon: <PenLineIcon className="fill-primary" />,
  },
  {
    name: "بيانات العمل",
    filter: "workData",
    icon: <UserWithFolderIcon className="fill-primary" />,
  },
  {
    name: "بيانات التواصل",
    filter: "contactInformation",
    icon: <AddressBookIcon className="fill-primary" />,
  },
]

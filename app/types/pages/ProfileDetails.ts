export type ProfileDetails = {
  personalData: {
    id: string
    nameEN: string
    name: string
    image: string
    nationality: string
    maritalStatus: string
    gender: string
    passportNumber: string
    bloodType: string
    birthDate: string
  }
  workData: {
    department: string
    job: string
    directManager: string
    appointmentDate: string
    governmentWorkStartDate: string
  }
  contactInformation: {
    mobilePhone: string
    secondMobile: string
    workEmail: string
    personalEmail: string
    workplaceLocation: string
    workExtension: string
  }
}

export type ProfileDetails = {
  personalData: {
    id: string
    nameEN: string
    nationality: string
    maritalStatus: string
    gender: string
    passportNumber: string
    bloodType: string
    birthDate: string
  }
  workData: {
    department: string
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

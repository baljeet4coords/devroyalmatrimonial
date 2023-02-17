enum PackageType {
  Free = "1",
  Silver = "2",
  Gold = "3",
  Premium = "4",
  deactive = "5",
  Blacklisted = "6",
}

enum ProfileFor {
  Self = "1",
  Son = "2",
  Daughter = "3",
  Sister = "4",
  Brother = "5",
  Relative = "6",
  Friend = "7",
}

enum Gender {
  M = "1",
  F = "2",
}

enum MaritalStatus {
  DoesNotMarried = "0",
  NeverMarried = "1",
  AwaitingDivorce = "2",
  Separated = "3",
  Divorced = "4",
  Widowed = "5",
  Annulled = "6",
}

enum YeNoNA {
  DoesNotMarried = "0",
  Yes = "1",
  No = "2",
  NA = "3",
}

enum AnnualIncomeProfile {
  Lakh_0_1 = "0",
  Lakhs_0_2 = "1",
  Lakhs_2_5 = "2",
  Lakhs_5_10 = "3",
  Lakhs_10_20 = "4",
  Lakhs_20_30 = "5",
  Lakhs_30_50 = "6",
  Lakhs_50_70 = "7",
  Cr_70_1 = "8",
  Cr_1_2 = "9",
  CrAbove_2 = "10",
}

enum AnnualIncomeProfile {
  Doesnotmatter = "0",
  Lessthan1lakh = "1",
  Greaterhtan1Lakhs = "2",
  Greaterhtan2Lakhs = "3",
  Greaterhtan5Lakhs = "4",
  Greaterhtan10Lakhs = "5",
  Greaterhtan20Lakhs = "6",
  Greaterhtan30Lakhs = "7",
  Greaterhtan50Lakhs = "8",
  Greaterhtan70Lakhs = "9",
  Greaterhtan1Cr = "10",
  Greaterhtan2Cr = "11",
}

enum MotherTongue {
  Doesnotmatter = "1",
  Hindi_Delhi_Punjabi = "2",
  Hindi_MP_CG = "3",
  Hindi_UP_UK = "4",
  Punjabi = "5",
  Hindi_Bihar_Jharkhand = "6",
  Hindi_Rajasthan = "7",
  Haryanvi = "8",
  Himachali = "9",
  Kashmiri = "10",
  Sindhi = "11",
  Urdu = "12",
  Marathi = "13",
  Gujarati = "14",
  Kutchi = "15",
  Konkani = "16",
  Tamil = "18",
  Telugu = "19",
  Kannada = "20",
  Malayalam = "21",
  Tulu = "22",
  Bengali = "24",
  Oriya = "25",
  Assamese = "26",
  Sikkim_or_Nepali = "27",
  English = "28",
}

enum Occupation {
  Doesnotmatter = "0",
  GovernmentPublicSector = "1",
  CivilServices = "2",
  Defense = "3",
  BusinessSelfEmployed = "4",
  NotWorking = "5",
  Administration = "6",
  AdvertisingMediaEntertainment = "7",
  Agricultural = "8",
  AirlineAviation = "9",
  Architecture = "10",
  ArmedForces = "11",
  BankingFinance = "12",
  BPOCustomerService = "13",
  CorporateManagementProfessionals = "14",
  Doctor = "15",
  TeacherEducationTraining = "16",
  Engineering = "17",
  Hospitality = "18",
  LawEnforcement = "19",
  Legal = "20",
  MerchantNavy = "21",
  OtherMedicalHealthcare = "22",
  ScienceResearch = "23",
  SoftwareIT = "24",
  TopManagement = "25",
  Others = "26",
}

enum Religion {
  Doesnotmatter = "0",
  Hindu = "1",
  Muslim = "2",
  Sikh = "3",
  Christian = "4",
  Buddhist = "5",
  Jain = "6",
  Parsi = "7",
  Jewish = "8",
  Bahai = "9",
  Other = "10",
}

enum ResidentialStatus {
  Doesnotmatter = "0",
  Citizen = "1",
  PermanentResident = "2",
  WorkPermit = "3",
  StudentVisa = "4",
  TemporaryVisa = "5",
}

enum Manglik {
  Doesnotmatter = "0",
  Manglik = "1",
  NonManglik = "2",
  Angshik_partialmanglik = "3",
}

enum Diet {
  Doesnotmatter = "0",
  Vegetarian = "1",
  NonVegetarian = "2",
  Jain = "3",
  Eggetarian = "4",
}

enum SmokeDrink {
  Doesnotmatter = "0",
  Yes = "1",
  No = "2",
  Occasionally = "3",
}

enum Challenged {
  None = "1",
  Physically_Frombirth = "2",
  Physically_Duetoaccident = "3",
  Mentally_Frombirth = "4",
  Mentally_Duetoaccident = "5",
}

enum FamilStatus {
  Rich_or_Affluent = "1",
  UpperMiddle = "2",
  MiddleClass = "3",
}

enum BortherSisterCount {
  None = "1",
  One = "2",
  Two = "3",
  Three = "4",
  Three_plus = "5",
}

enum FamilyType {
  Joint = "1",
  Nuclear = "2",
}

enum BloodGroup {
  A_plus = "1",
  B_plus = "2",
  O_plus = "3",
  AB_plus = "4",
  A_negative = "5",
  B_negative = "6",
  O_negative = "7",
  AB_negative = "8",
}

enum Thalassemia {
  No = "1",
  Major = "2",
  Minor = "3",
}

enum ChildrenStatus {
  Doesnotmatter = "0",
  No = "1",
  Yes_Livingtogether = "2",
  Yes_LivingSeparatly = "3",
}

enum ParentsProfession {
  Housewife_or_Homemaker = "1",
  Business_or_Entrepreneur = "2",
  Service_or_Private = "3",
  Service_or_Govt_PSU = "4",
  Army = "5",
  CivilServices = "6",
  Teacher = "7",
  Retired = "8",
  Expired = "9",
}

enum profile_platform {
  laptop_website = "1",
  mobile_website = "2",
  android_app = "3",
  ios_app = "4",
}

enum EventType {
  HinduPunjabi = "1",
  Sikh = "2",
  MaritalStatus = "3",
}

enum Privacy_Setting {
  public = "1",
  ShowntoInterestsent_accepted = "2",
  ShowntoInterestsent_rejected = "3",
}

export interface IRegisterStep1 {
  actionType: string;
  userId: string;
  profilefor?: string;
  profileHandlerName?: string;
  dob?: string;
  selectgender?: string;
  fullname?: string;
  profilepic?: string;
  cast?: string;
  challenged?: string;
  isHiv?: string;
  mothertongue?: string;
  religion?: string;
  isManglik?: string;
  maritalstatus?: string;
  childrenstatus?: string;
  height?: string;
}

export interface IRegisterStep1Response {
  caste: number;
  challenged: number;
  children_status: number;
  dob: string;
  fullname: string;
  gender: string;
  height_cm: number;
  hiv: number;
  manglik: number;
  marital_status: number;
  mother_tongue: number;
  photo: string;
  profile_for: number;
  profile_handlername: string;
  religion: number;
}

export interface IRegisterStep5 {
  actionType: string;
  userId: string;
  aboutCareer?: string;
  aboutFamily?: string;
  aboutEducation?: string;
  basicIntro?: string;
}

export interface IRegisterStep5Response {
  basic_intro: string | null;
  about_career: string | null;
  about_family: string | null;
  about_education: string | null;
}

export interface IRegisterStep4 {
  actionType: string;
  userId: string;
  fathersProfession?: string;
  mothersProfession?: string;
  sister?: string;
  brother?: string;
  gothra?: string;
  familyStatus?: string;
  familyIncome?: string;
  familyType?: string;
  familyNativeCountry?: number;
  familyNativeState?: number;
  familyNativeCity?: number;
  livingWithParents?: string;
}
export interface IRegisterStep4Response {
  Father: number | null;
  Gothra: number | null;
  Mother: number | null;
  Sister: number | null;
  Brother: number | null;
  Family_Type: number | null;
  Family_Income: number | null;
  Family_Status: number | null;
  family_native_city: number | null;
  family_native_state: number | null;
  living_with_parents: number | null;
  family_native_country: number | null;
}

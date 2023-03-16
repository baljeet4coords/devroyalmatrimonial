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
  userId?: number;
  aboutCareer?: string | null;
  aboutFamily?: string | null;
  aboutEducation?: string | null;
  basicIntro?: string | null;
}

export interface IRegisterStep5Response {
  basic_intro: string | null;
  about_career: string | null;
  about_family: string | null;
  about_education: string | null;
}

export interface IRegisterStep4 {
  actionType: string;
  userId?: number;
  fathersProfession?: number;
  mothersProfession?: number;
  sister?: number;
  brother?: number;
  gothra?: string;
  familyStatus?: number;
  familyIncome?: number;
  familyType?: number;
  familyNativeCountry?: number;
  familyNativeState?: number;
  familyNativeCity?: number;
  livingWithParents?: number;
}
export interface IRegisterStep4Response {
  Father: number;
  Gothra: string;
  Mother: number;
  Sister: number;
  Brother: number;
  Family_Type: number;
  Family_Income: number;
  Family_Status: number;
  family_native_country: number | (() => number);
  family_native_state?: number | (() => number);
  family_native_city: number | (() => number);
  living_with_parents: number ;
}

export interface IRegisterStep1 {
  actionType: "v" | "c" | "u";
  userId?: number;
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
export interface IRegisterStep2 {
  actionType: "v" | "c" | "u";
  userId?: number;
  country?: number;
  state?: number;
  city?: number;
  education?: number;
  occupation?: number;
  annualIncome?: number;
  residentialStatus?: number;
  readyToSettleAbroad?: number;
  college?: number;
}

export interface IRegisterStep2Response {
  city: number;
  state: number;
  College: string;
  country: number;
  education: number;
  occupation: number;
  annual_income: number;
  residentialstatus: number;
  readytosettleabroad: number;
}

export interface IRegisterStep3 {
  actionType: "v" | "c" | "u";
  userId?: number;
  diet?: number;
  smoking?: number;
  drinking?: number;
  love_pets?: number;
  Owns_house?: number;
  Owns_car?: number;
  blood_group?: number;
  Thalassemia?: number;
  religious_belief?: number;
}
export interface IRegisterStep3Response {
  diet: number;
  smoking: number;
  drinking: number;
  love_pets: number;
  Owns_house: number;
  Owns_car: number;
  blood_group: number;
  Thalassemia: number;
  religious_belief: number;
}
export interface IRegisterStep4 {
  actionType?: "v" | "c" | "u";
  userId?: number;
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
  Father: number;
  Gothra: string;
  Mother: number;
  Sister: number;
  Brother: number;
  Family_Type: number;
  Family_Income: number;
  Family_Status: number;
  family_native_country: number,
  family_native_state: number,
  family_native_city: number,
  living_with_parents: number;
}

export interface IRegisterStep5 {
  actionType: "v" | "c" | "u";
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

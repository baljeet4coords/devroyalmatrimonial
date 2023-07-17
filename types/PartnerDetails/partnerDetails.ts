export interface IPartnerDetailsP1Response {
  caste: number;
  challenged: number;
  children_status: number;
  dob: string;
  emailid: string;
  fullname: string;
  gender: string;
  height_cm: number;
  hiv: number;
  isd_code: number;
  manglik: number;
  marital_status: number;
  mobile: number;
  mother_tongue: number;
  photo: string;
  profile_for: number;
  profile_handlername: string;
  religion: number;
}

export interface IPartnerDetailsP2Response {
  College: string;
  annual_income: number;
  city: number;
  country: number;
  education: number;
  occupation: number;
  readytosettleabroad: number;
  residentialstatus: number;
  state: number;
}

export interface IPartnerDetailsP3Response {
  Owns_car: number;
  Owns_house: number;
  Thalassemia: number;
  blood_group: number;
  car_details: string[];
  diet: number;
  drinking: number;
  home_type: string[];
  love_pets: number;
  religious_belief: string;
  smoking: number;
}

export interface IPartnerDetailsP4Response {
  Brother: number;
  Family_Income: number;
  Family_Status: number;
  Family_Type: number;
  Father: number;
  Gothra: string;
  Mother: number;
  Sister: number;
  family_native_city: number;
  family_native_country: number;
  family_native_state: number;
  living_with_parents: number;
}

export interface IPartnerDetailsP5Response {
  about_career: string;
  about_education: string;
  about_family: string;
  basic_intro: string;
  coverImage: string;
  galleryImages: string[];
  pobCity: number;
  pobCountry: number;
  pobState: number;
}

export interface IPartnerDetailsPrivacyResponse {
  privacy_show_contact: string | null;
  privacy_show_name: string | null;
  privacy_show_photo: string | null;
}

export interface IPartnerDetailsInterestResponse {
  Recieve: string | null;
  Send: string | null;
}

export interface ISearchByDataPayload {
  userId?: string;
  ageGreaterThan?: string;
  ageLessThan?: string;
  heightGreaterThan?: string;
  heightLessThan?: string;
  country?: string;
  state?: string;
  city?: string;
  education?: string;
  occupation?: string;
  annualIncome?: string | "";
  maritalStatus?: string;
  religion?: string;
  motherTongue?: string;
  caste?: string;
  residentialStatus?: string;
  manglik?: string;
  diet?: string;
  smoking?: string;
  drinking?: string;
  readyToSettleAbroad?: string;
  challenged?: string;
  childrenStatus?: string;
  hiv?: string;
  mandatoryFields?: string;
  maxUserId: string;
  limit: string;
  viceVersaFlag: string;
  excludedUsers: string;
}
export interface ISearchByDataResponse {
  dob: string;
  city: number;
  caste: number;
  photo: string;
  state: number;
  userid: number;
  country: number;
  fullname: string;
  interest: {
    Send: null | string;
    Receive: null | string;
  };
  religion: number;
  education: number;
  height_cm: number;
  shortlist: number;
  occupation: number;
  user_RM_ID: string;
  basic_intro: string | null;
  privacy_name: null | string;
  annual_income: number;
  privacy_photo: null | string;
  marital_status: number;
  matching_score: number;
  privacy_contact: null | string;
  user_last_login: null | string;
}

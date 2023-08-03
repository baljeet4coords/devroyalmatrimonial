export interface ICardResponse {
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

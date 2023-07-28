export interface IProfileVisitorsResponse {
  row: number;
  userid: number;
  usercard: IProfileVisitorsResponseCard;
  visitorid: number;
}

export interface IProfileVisitorsResponseCard {
  dob: string;
  city: number;
  caste: number;
  photo: string;
  state: number;
  userid: number;
  country: number;
  fullname: string;
  interest: {
    Send: string;
    Receive: string;
  };
  religion: number;
  education: number;
  height_cm: number;
  shortlist: number;
  occupation: number;
  user_RM_ID: string;
  privacy_name: string;
  annual_income: number;
  privacy_photo: string;
  marital_status: number;
  matching_score: number;
  privacy_contact: string;
  user_last_login: string;
}

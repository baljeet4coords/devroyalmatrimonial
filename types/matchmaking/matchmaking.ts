export interface IMatchMakingResponse {
  row: number;
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
  privacy_name: null | string;
  annual_income: number;
  privacy_photo: null | string;
  marital_status: number;
  matching_score: number;
  privacy_contact: null | string;
  user_last_login: null | string;
}

// export interface IMatchMakingResponse {
//   dob: "1990-11-29 20:20:00.000000";
//   row: 1;
//   city: 3;
//   caste: 33;
//   photo: "uploads/423/1684670113786.jpeg";
//   userid: 423;
//   fullname: "Chandranshu Sharma";
//   religion: 1;
//   height_cm: 178;
//   shortlist: null;
//   occupation: 4;
//   user_RM_ID: "RM151A731";
//   privacy_name: null;
//   annual_income: 8;
//   privacy_photo: null;
//   marital_status: 4;
//   matching_score: 16;
//   privacy_contact: null;
//   user_last_login: null;
// }

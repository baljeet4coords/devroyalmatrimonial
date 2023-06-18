export interface IMatchMakingResponse {
  row: number;
  photo:string;
  userid: number;
  fullname: string;
  userRMID: string;
  privacy_name: null |string;
  privacy_photo: null |string;
  matching_score: number;
  privacy_contact: null | string;
}

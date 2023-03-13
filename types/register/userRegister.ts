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

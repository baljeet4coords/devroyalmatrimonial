import * as Yup from "yup";
import {
  Challenged,
  ChildrenStatus,
  Manglik,
  MaritalStatus,
  MotherTongue,
  ProfileFor,
  Religion,
  isHiv,
} from "../types/enums";
import { CastListArray } from "../constants/CastListArray";

const profileDetailsSchema = Yup.object({
  profilefor: Yup.string().oneOf(
    Object.values(ProfileFor),
    "Please select a valid profile for"
  ),
  profileHandlerName: Yup.string()
    .required("Profile handler name is required")
    .required("Mandatory Field"),
  dob: Yup.date().required("Date of birth is required"),
  selectgender: Yup.string().required("Gender is required"),
  fullname: Yup.string().required("Full name is required"),
  cast: Yup.string()
    .oneOf(
      CastListArray.map((cast) => cast.id),
      "Please select a valid caste"
    )
    .required("Mandatory Field"),
  challenged: Yup.string()
    .oneOf(Object.values(Challenged), "Please select a valid challenged type")
    .required("Mandatory Field"),
  isHiv: Yup.string()
    .oneOf(Object.values(isHiv), "Please select a valid hiv type")
    .required("Mandatory Field"),
  mothertongue: Yup.string()
    .oneOf(Object.values(MotherTongue), "Please select a valid profile for")
    .required("Mandatory Field"),
  religion: Yup.string()
    .oneOf(Object.values(Religion), "Please select a valid religion")
    .required("Mandatory Field"),
  isManglik: Yup.string()
    .oneOf(Object.values(Manglik), "Please select a manglik type")
    .required("Mandatory Field"),
  maritalstatus: Yup.string()
    .oneOf(Object.values(MaritalStatus), "Please select a marital status type")
    .required("Mandatory Field"),
  childrenstatus: Yup.string()
    .oneOf(
      Object.values(ChildrenStatus),
      "Please select a children status type"
    )
    .required("Mandatory Field"),
  height: Yup.number().required("Height is required"),
  profilepic: Yup.string().required("Profile picture is required"),
});

export default profileDetailsSchema;

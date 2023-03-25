import * as Yup from "yup";

export const textAreaSchema = Yup.object().shape({
  aboutCareer: Yup.string()
    .matches(
      /^[a-zA-Z0-9,.\s]+$/,
      "Only alphabets, numbers, spaces, commas, and periods are allowed"
    )
    .required("This field is required"),
  aboutFamily: Yup.string()
    .matches(
      /^[a-zA-Z0-9,.\s]+$/,
      "Only alphabets, numbers, spaces, commas, and periods are allowed"
    )
    .required("This field is required"),
  aboutEducation: Yup.string()
    .matches(
      /^[a-zA-Z0-9,.\s]+$/,
      "Only alphabets, numbers, spaces, commas, and periods are allowed"
    )
    .required("This field is required"),
  basicIntro: Yup.string()
    .matches(
      /^[a-zA-Z0-9,.\s]+$/,
      "Only alphabets, numbers, spaces, commas, and periods are allowed"
    )
    .required("This field is required"),
});

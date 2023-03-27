import * as Yup from "yup";

export const textAreaSchema = Yup.object().shape({
  aboutCareer: Yup.string().matches(
    /^[a-zA-Z0-9,.\s]+$/,
    "Only alphabets, numbers, spaces, commas, and periods are allowed"
  ),
  aboutFamily: Yup.string().matches(
    /^[a-zA-Z0-9,.\s]+$/,
    "Only alphabets, numbers, spaces, commas, and periods are allowed"
  ),
  aboutEducation: Yup.string().matches(
    /^[a-zA-Z0-9,.\s]+$/,
    "Only alphabets, numbers, spaces, commas, and periods are allowed"
  ),
  basicIntro: Yup.string().matches(
    /^[a-zA-Z0-9,.\s]+$/,
    "Only alphabets, numbers, spaces, commas, and periods are allowed"
  ),
});

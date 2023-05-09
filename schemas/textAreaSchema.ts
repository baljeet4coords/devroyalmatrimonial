import * as Yup from "yup";

export const textAreaSchema = Yup.object().shape({
  aboutCareer: Yup.string()
    .nullable()
    .default("")
    .max(1000, "Maximum 1000 characters allowed")
    .matches(
      /^[0-9a-zA-Z.,\s]*$/,
      "Only alphabets, numbers, spaces, commas, and periods are allowed"
    ),
  aboutFamily: Yup.string()
    .max(1000, "Maximum 1000 characters allowed")
    .nullable()
    .default("")
    .matches(
      /^[0-9a-zA-Z.,\s]*$/,
      "Only alphabets, numbers, spaces, commas, and periods are allowed"
    ),
  aboutEducation: Yup.string()
    .max(1000, "Maximum 1000 characters allowed")
    .nullable()
    .default("")
    .matches(
      /^[0-9a-zA-Z.,\s]*$/,
      "Only alphabets, numbers, spaces, commas, and periods are allowed"
    ),
  basicIntro: Yup.string()
    .max(1000, "Maximum 1000 characters allowed")
    .nullable()
    .default("")
    .matches(
      /^[0-9a-zA-Z.,\s]*$/,
      "Only alphabets, numbers, spaces, commas, and periods are allowed"
    ),
});

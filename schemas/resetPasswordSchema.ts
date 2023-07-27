import * as Yup from "yup";
export const ResetPasswordSchema = Yup.object().shape({
  emailid: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
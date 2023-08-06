import * as Yup from "yup";
export const ResetPasswordSchema = Yup.object().shape({
  emailid: Yup.string().email("Invalid email address"),
  phoneNo: Yup.string().matches(/^[7-9]\d{9}$/, "Invalid mobile number"),
});

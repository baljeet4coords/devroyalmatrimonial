import * as Yup from "yup";
export const UpdatePasswordSchema = Yup.object().shape({
  newpassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not be more than 16 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not be more than 16 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .required("Password is required"),
});
